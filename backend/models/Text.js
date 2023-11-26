import mongoose from "mongoose";

const Schema = mongoose.Schema;

// content Schema
const textSchema = new Schema({
  beginner: [
    {
      content: {
        type: String,
        required: true,
      },
    },
  ],
  intermediate: [
    {
      content: {
        type: String,
        required: true,
      },
    },
  ],
  advanced: [
    {
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

const text = mongoose.model("Text", textSchema);

export default text;
