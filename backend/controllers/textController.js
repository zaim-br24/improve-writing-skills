import Texts from "../models/Text.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import findMistakes from "../utils/findMistakes.js";
import { awsPolly, getObjectSignedUrl } from "../utils/awsPolly.js";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
const addText = async (req, res) => {
  const { category, content } = req.body;

  if (!category || !content) {
    throw new BadRequestError("Please provide all values!");
  }

  try {
    const filename = generateFileName();
    const pollyBucket = process.env.AWS_POLLY_BUCKET;

    const result = await awsPolly(content, filename);
    // const audioUrl = await getObjectSignedUrl(filename);
    // console.log("Audio file uploaded to S3:", result);
    // console.log("Audio url:", audioUrl);
const audioUrl = `https://${pollyBucket}.s3.amazonaws.com/${filename}.mp3`;
    const updatedContent = await Texts.findOneAndUpdate(
      {},
      {
        $push: {
          [category]: { content: content, audioUrl: audioUrl },
        },
      },
      { new: true, upsert: true }
    );
    !!res.status(StatusCodes.CREATED).json(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Something went wrong while updating the text! Please try again.",
    });
  }
};
const getText = async (req, res) => {
  const { category } = req.query;

  try {
    const foundCategory = await Texts.findOne({}, { [category]: 1 });

    if (!foundCategory || !foundCategory[category]) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: `Category '${category}' not found or has no content.`,
      });
    }
    const contentCount = foundCategory[category].length;

    if (contentCount === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: `No content found in the '${category}' category.`,
      });
    }

    let randomIndex;
    const prevIndices = req.session.prevIndices || [];

    do {
      randomIndex = Math.floor(Math.random() * contentCount);
    } while (prevIndices.includes(randomIndex));

    const maxPrevIndices = 10;
    if (prevIndices.length >= maxPrevIndices) {
      prevIndices.shift();
    }
    prevIndices.push(randomIndex);

    req.session.prevIndices = prevIndices;

    const generatedText = foundCategory[category][randomIndex];

    res.status(StatusCodes.OK).json({
      category: category,
      generatedText: generatedText.content,
      audioUrl: generatedText.audioUrl
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong while retrieving random content.",
    });
  }
};

const checkValues = (req, res) => {
  const { originalSentence, userSentence } = req.body;
  if (!originalSentence || !userSentence) {
    throw new BadRequestError("please provide both values.");
  }
  try {
    let mistakes = findMistakes(originalSentence, userSentence);
    console.log(mistakes);
    let result = [];
    for (let i = 0; i < mistakes.length; i++) {
      const currentMistake = mistakes[i];
      const nextMistake = mistakes[i + 1];

      if (
        currentMistake &&
        currentMistake.length > 1 &&
        nextMistake &&
        nextMistake.length > 1
      ) {
        for (let y = 0; y < currentMistake.length; y++) {
          result.push(currentMistake[y]);
          result.push(nextMistake[y]);
        }
        i++; // Skip the next mistake since it has already been processed
      } else if (
        currentMistake &&
        currentMistake.length > 1 &&
        (!nextMistake || nextMistake.length <= 1)
      ) {
        result.push(currentMistake);
      } else {
        result.push(currentMistake && currentMistake[0]);
      }
    }

    res.status(StatusCodes.OK).json({
      mistakes: result,
      count: result.length > 1 ? result.length / 2 : result.length,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong while retrieving random content.",
    });
  }
};
export { addText, getText, checkValues };
