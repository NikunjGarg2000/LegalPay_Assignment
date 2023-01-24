const mongoose = require("mongoose");

const bankAccountModel = mongoose.Schema(
  {
    accountHolderName: { type: String, trim: true },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    balance: { type: Number },
  },
  { timestamps: true }
);

const bankAccount = mongoose.model("bankAccount", bankAccountModel);

module.exports = bankAccount;
