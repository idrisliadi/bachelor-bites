const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: [
        "breakfast",
        "lunch",
        "dinner",
        "snack"
      ],
      required: true
    },

    ingredients: [
      {
        name: String,
        quantity: String
      }
    ],

    instructions: [
      String
    ],

    prepTime: {
      type: Number,
      required: true
    },

    cookTime: {
      type: Number,
      required: true
    },

    cost: {
      type: Number,
      required: true
    },

    difficulty: {
      type: String,
      enum: [
        "easy",
        "medium",
        "hard"
      ],
      default: "easy"
    },

    tags: [
      String
    ],

    rating: {
      type: Number,
      default: 4.5
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Meal", mealSchema);
