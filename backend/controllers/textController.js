import Texts from "../models/Text.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import findMistakes from "../utils/findMistakes.js";
const addText = async (req, res) => {
  const { category, content } = req.body;

  if (!category || !content) {
    // Assuming BadRequestError is defined and imported
    throw new BadRequestError("Please provide all values!");
  }

  try {
    const updatedContent = await Texts.findOneAndUpdate(
      {},
      {
        $push: {
          [category]: { content: content },
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
    // Find the category based on the query
    const foundCategory = await Texts.findOne({}, { [category]: 1 });

    if (!foundCategory || !foundCategory[category]) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: `Category '${category}' not found or has no content.`,
      });
    }

    // Get the count of content in that category
    const contentCount = foundCategory[category].length;

    if (contentCount === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: `No content found in the '${category}' category.`,
      });
    }

    // Generate a random number within the count
    let randomIndex;
    const prevIndices = req.session.prevIndices || [];

    do {
      randomIndex = Math.floor(Math.random() * contentCount);
    } while (prevIndices.includes(randomIndex));

    // Limit the number of stored previous indices, adjust as needed
    const maxPrevIndices = 10;
    if (prevIndices.length >= maxPrevIndices) {
      prevIndices.shift(); // Remove the oldest index
    }

    // Add the new randomIndex to the array
    prevIndices.push(randomIndex);

    // Store the updated array in the session
    req.session.prevIndices = prevIndices;

    // Use the random number to retrieve a random content from the category
    const generatedText = foundCategory[category][randomIndex];

    res.status(StatusCodes.OK).json({
      category: category,
      generatedText: generatedText.content,
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
    console.log(mistakes)
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
