const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    budget: {
      type: Number,
      default: 3000
    },

    maxCookingTime: {
      type: Number,
      default: 30
    },

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("User", userSchema);