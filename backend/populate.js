// this file was only created upload data to database so its easy to work with it not create each job, and the main reason is for the stats page which needs different published times
// this only runs once to populate DATA (fake data)
import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/connectDB.js";
import Texts from "./models/Text.js";
import { awsPolly } from "./utils/awsPolly.js";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
const start = async () => {
  try {
    await connectDB(process.env.DB_URL, process.env.DB_PASSWORD);
    await Texts.deleteMany();
    const pollyBucket = process.env.AWS_POLLY_BUCKET;

    const jsonProducts = JSON.parse(
      await readFile(new URL("./data.json", import.meta.url))
    );
   for (let level in jsonProducts) {
     console.log(`Processing skill level: ${level}`);

     for (let i = 0; i < jsonProducts[level].length; i++) {
           const filename = generateFileName();

       console.log(`Processing item ${i} in ${level}`);

       const result = await awsPolly(
         jsonProducts[level][i].content,
         filename
       );
       const audioUrl = `https://${pollyBucket}.s3.amazonaws.com/${filename}.mp3`;

       jsonProducts[level][i].audioUrl = audioUrl;

       console.log(
         `Updated item ${i} in ${level} with audioUrl: ${audioUrl}`
       );
     }
   }

    await Texts.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
