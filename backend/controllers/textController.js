import Texts from "../models/Text.js";
import Users from "../models/User.js";

import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import findMistakes from "../utils/findMistakes.js";
import { awsPolly, getAudioUrl, deleteObject } from "../utils/awsPolly.js";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
const addText = async (req, res) => {
  const { category, content } = req.body;

  if (!category || !content) {
    throw new BadRequestError("Please provide all values!");
  }

  try {
    const audioUrl = await getAudioUrl(content);
    const updatedContent = await Texts.findOneAndUpdate(
      {},
      {
        $push: {
          [category]: { content: content, audioUrl: audioUrl },
        },
      },
      { new: true, upsert: true }
    );
    // !!
    res.status(StatusCodes.CREATED).json({
      content,
      audioUrl,
    });
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
      audioUrl: generatedText.audioUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong while retrieving random content.",
    });
  }
};

const checkValues = async (req, res) => {
  const { originalSentence, userSentence } = req.body;
  if (!originalSentence || !userSentence) {
    throw new BadRequestError("please provide both values.");
  }
  try {
    let mistakes = findMistakes(originalSentence, userSentence);
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
        i++;
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
      allMistakes: mistakes,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong while retrieving random content.",
    });
  }
};
const addCustomText = async (req, res) => {
  const { customText } = req.body;
  const plans = {
    free: 3,
    pro: 20,
    premium: 40,
  };

  if (!customText) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Add your text!" });
  } else if (customText.length > 150) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Text too long." });
  }

  try {
    const audioUrl = await getAudioUrl(customText);

    const user = await Users.findOne({ _id: req.user.userId });
    const plan = user.plan;

    if (user.customTexts.length >= plans[plan]) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg:` You have reached the limit of the ${plan} plan. Please Upgrade Your Plan.`,
      });
    }

    user.customTexts.push({ content: customText, audioUrl: audioUrl });
    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Custom text added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};


const getCustomTexts = async (req, res) => {
  try {
    const user = await Users.findById(req.user.userId);
    if (!user) {
      throw new NotFoundError(
        "User not found when trying to fetch custom texts"
      );
    }
    res.status(StatusCodes.OK).json({ customTexts: user.customTexts });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};
const deleteCustomText = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ _id: req.user.userId });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const filteredCustomTexts = user.customTexts.filter(
      (text) => text._id.toString() !== id
    );

    if (user.customTexts.length === filteredCustomTexts.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Custom text not found" });
    }
    const filenameToDelete = user.customTexts.id(id)?.audioUrl.split("/").pop();
    user.customTexts = filteredCustomTexts;
    await user.save();
    if (filenameToDelete) {
      deleteObject(filenameToDelete);
    }
    res
      .status(StatusCodes.OK)
      .json({ msg: "Custom text deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};

const updateCustomText = async (req, res) => {
  const { id } = req.params;
  const { customText } = req.body;
  if (!customText) {
    throw new BadRequestError("Add your text!");
  } else if (customText.length > 50) {
    throw new BadRequestError("Text too long.");
  }

  try {
    const user = await Users.findOne({ _id: req.user.userId });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }
    const existingCustomText = user.customTexts.id(id);
    if (!existingCustomText) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Custom text not found" });
    }
    const audioUrl = await getAudioUrl(customText);

    existingCustomText.content = customText;
    existingCustomText.audioUrl = audioUrl;

    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ msg: "Custom text updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};
const addMistakes = async (req, res) => {
  const { result } = req.body;
  try {
    const user = await Users.findById(req.user.userId);
    for (let i = 0; i < result.length; i += 2) {
      const newMistake = {
        mistake: result[i + 1],
        answer: result[i],
      };
      const isDuplicate = user.mistakes.some(
        (existingMistake) =>
          existingMistake.mistake.toLocaleLowerCase() ===
            newMistake.mistake.toLocaleLowerCase() &&
          existingMistake.answer.toLocaleLowerCase() ===
            newMistake.answer.toLocaleLowerCase()
      );
      if (!isDuplicate) {
        user.mistakes.push(newMistake);
      }
    }

    await user.save();
    res.status(StatusCodes.OK).json(user.mistakes);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};

const getMistakes = async (req, res) => {
  try {
    const user = await Users.findById(req.user.userId);
    res.status(StatusCodes.OK).json({
      mistakes: user.mistakes,
      count: user.mistakes.length,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};
const deleteMistake = async (req, res) => {
  const { mistakeId } = req.params;
  try {
    const user = await Users.findById(req.user.userId);
    user.mistakes = user.mistakes.filter(
      (mistake) => mistake._id.toString() !== mistakeId
    );
    await user.save();
    res.status(StatusCodes.OK).json({ msg: "Mistake deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};
export {
  addText,
  getText,
  checkValues,
  addCustomText,
  getCustomTexts,
  deleteCustomText,
  updateCustomText,
  addMistakes,
  getMistakes,
  deleteMistake,
};
