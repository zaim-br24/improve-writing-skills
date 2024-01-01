import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "please provide a firstname"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  lastname: {
    type: String,
    minlength: 3,
    maxlength: 20,
    trim: true,
    default: "lastname",
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "please provide a valid email",
    },
    trim: true,
  },
  password: {
    type: String,
    // required: [true, "please provide a password"],
    minlength: 8,
    maxlength: 20,
    select: false, // the SELET key === false means can't be accessed if you return it from the DB using 'find' or 'findOne'
  },
  picture: { type: String },
  role: { type: String, default: "student" },
  customTexts: [
    {
      content: {
        type: String,
      },
      audioUrl: {
        type: String,
      },
    },
  ],
  vocabulary: [
    {
      word: {
        type: String,
      },
      meaning: {
        type: String,
      },
      audioUrl: { type: String },
    },
  ],
  mistakes: [
    {
      mistake: {
        type: String,
      },
      answer: {
        type: String,
      }
    },
  ],
  level: {
    type: String,
  },
});

// hashing the password
UserSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
});

// this function can access to the THIS object which include the User register information
UserSchema.methods.createJWT = function () {
  const payload = {
    userId: this._id,
    email: this.email,
  };
  const token = jwt.sign(payload, "" + process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};
//compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
