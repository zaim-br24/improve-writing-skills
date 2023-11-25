import mongoose from "mongoose";

const  Schema = mongoose.Schema;

// Level Schema
const levelSchema = new Schema({
  level: String,
  content: String,
});

// Levels Schema
const levelsSchema = new Schema({
  beginner: [levelSchema],
  intermediate: [levelSchema],
  advanced: [levelSchema],
});

// Language Schema
const languageSchema = new Schema({
  name: String,
  levels: levelsSchema,
});

// Creating model
const Language = mongoose.model("Language", languageSchema);

module.exports = Language;
