import Texts from "../models/Text.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
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
    const randomContent = foundCategory[category][randomIndex];

    res.status(StatusCodes.OK).json({
      category: category,
      randomContent: randomContent.content,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong while retrieving random content.",
    });
  }
};

export { addText, getText };
