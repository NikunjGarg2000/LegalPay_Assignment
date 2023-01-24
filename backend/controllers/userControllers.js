const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, accountBalance } = req.body;

  if (!name || !email || !password || !accountBalance) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    accountBalance,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      accountBalance: user.accountBalance,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      accountBalance: user.accountBalance,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  const user = await User.find({ _id: { $eq: req.user._id } });

  console.log(user);
  res.send(user);
});

const withdrawBal = asyncHandler(async (req, res) => {
  const { moneyToWithdraw } = req.body;

  const user = await User.find({ _id: { $eq: req.user._id } });

  User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        accountBalance: parseInt(
          parseInt(user[0].accountBalance) - parseInt(moneyToWithdraw)
        ),
      },
    },
    function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Money Withdrawn");
        res.send(user);
      }
    }
  );
});

const depositBal = asyncHandler(async (req, res) => {
  const { moneyToDeposit } = req.body;

  const user = await User.find({ _id: { $eq: req.user._id } });

  User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        accountBalance: parseInt(
          parseInt(user[0].accountBalance) + parseInt(moneyToDeposit)
        ),
      },
    },
    function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Money deposited");
        res.send(user);
      }
    }
  );
});

module.exports = {
  registerUser,
  authUser,
  currentUser,
  withdrawBal,
  depositBal,
};
