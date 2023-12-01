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
      audioUrl: {
        type: String,
      },
    },
  ],
  intermediate: [
    {
      content: {
        type: String,
        
        required: true,
      },
      audioUrl: {
        type: String,
      },
    },
  ],
  advanced: [
    {
      content: {
        type: String,
        required: true,
      },
      audioUrl: {
        type: String,
      },
    },
  ],
});

const text = mongoose.model("Text", textSchema);

export default text;
