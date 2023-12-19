import Users from "../models/User.js";

import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    throw new BadRequestError("Please provide all values.");
  }
  //check if user exist
  const userAlreadyExist = await Users.findOne({ email });
  if (userAlreadyExist) {
    const firstLetter = email[0];
    const restOfEmail = email.slice(email.length - 10);
    throw new BadRequestError(
      `${firstLetter + "*****" + restOfEmail} email already in use.`
    );
  }
  //create a user
  const user = await Users.create({
    firstname,
    lastname,
    email,
    password,
  });
  //calling the createJWT coming from User schema to create a token (unique key)
  const token = user.createJWT();
  //returning the user object without the PASSWORD
  res.status(StatusCodes.CREATED).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    token,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials!");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials!");
  }
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    customTexts: user.customTexts,

    token,
  });
};

const updateUser = async (req, res) => {
  const { firstname, email, lastname } = req.body;
  if (!email || !firstname || !lastname) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await Users.findOne({ _id: req.user.userId });

  user.email = email;
  user.lastname = lastname;
  user.firstname = firstname;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    token,
  });
};
const updatePassword = async (req, res) => {
  console.log(req.body);

  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await Users.findOne({ _id: req.user.userId }).select(
    "+password"
  );

  if (!user) {
    throw new UnauthenticatedError("user not found!");
  }
  //check password is correct
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Old password is wrong!");
  }
  if (newPassword !== confirmPassword) {
    throw new BadRequestError(" New passwords are not matched !");
  }
  user.password = newPassword;

  const token = user.createJWT();
  await user.save();

  res.status(StatusCodes.OK).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    token,
  });
};

export { register, login, updateUser, updatePassword };
