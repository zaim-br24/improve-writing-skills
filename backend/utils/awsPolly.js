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

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const pollyBucket = process.env.AWS_POLLY_BUCKET;

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

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 3600;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
};
// const filename = generateFileName();
//  console.log(filename)
//  const result = await awsPolly(
//    "This tool help students improve their writing skills",
//    filename
// );
//   console.log(filename);

//  const audioUrl = await getObjectSignedUrl(filename);

//  console.log("Audio file uploaded to S3:", result);
//  console.log("Audio url", audioUrl);
// (async () => {
//   try {
//     const filename = generateFileName();

//     const result = await awsPolly(
//       "This tool hepl students improve their writing skills",
//       filename
//     );
//     const audioUrl = await getObjectSignedUrl(filename);

//     console.log("Audio file uploaded to S3:", result);
//     console.log("Audio url", audioUrl);
//   } catch (error) {
//     console.error(error);
//   }
// })();
export { awsPolly, getObjectSignedUrl };
