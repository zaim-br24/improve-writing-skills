import AWS from "aws-sdk";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
let generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const region = process.env.SWA_BUCKET_REGION;
const accessKeyId = process.env.SWA_KEY;
const secretAccessKey = process.env.SWA_SECRET_KEY;
const pollyBucket = process.env.SWA_POLLY_BUCKET;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

const polly = new AWS.Polly();
const s3 = new AWS.S3();
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const awsPolly = async (text, filename) => {
  const params = {
    Text: text,
    OutputFormat: "mp3",
    VoiceId: "Joanna",
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();

    // Upload the audio file to S3
    const s3Params = {
      Bucket: pollyBucket,
      Key: `${filename}.mp3`,
      Body: data.AudioStream,
    };
    await s3.upload(s3Params).promise();
    return data;
  } catch (err) {
    console.error("Error converting text to speech:", err);
    throw err;
  }
};
const getObjectSignedUrl = async (filename) => {
  const params = {
    Bucket: pollyBucket,
    Key: filename,
  };
  const command = new GetObjectCommand(params);
  const seconds = 3600;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
};
const getAudioUrl = async (content) => {
  const filename = generateFileName();
  const pollyBucket = process.env.AWS_POLLY_BUCKET;

  const result = await awsPolly(content, filename);
  const audioUrl = `https://${pollyBucket}.s3.amazonaws.com/${filename}.mp3`;
  return audioUrl;
};

const deleteObject = async (filename) => {
  const params = {
    Bucket: pollyBucket,
    Key: filename,
  };

  const command = new DeleteObjectCommand(params);

  try {
    await s3Client.send(command);
    console.log(`File ${filename} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting file ${filename}:`, error);
  }
};

export { awsPolly, getObjectSignedUrl, getAudioUrl, deleteObject };
