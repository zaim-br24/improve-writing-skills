import mongoose from "mongoose";

const Schema = mongoose.Schema;

// content Schema
const textSchema = new Schema({
  beginner: [
    {
      content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 4,
        trim: true,
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
        minlength: 3,
        maxlength: 50,
        trim: true,
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
        minlength: 3,
        maxlength: 70,
        trim: true,
      },
      audioUrl: {
        type: String,
      },
    },
  ],
});

const text = mongoose.model("Text", textSchema);

export default text;
