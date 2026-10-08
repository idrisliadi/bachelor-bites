const express = require("express");
const Meal = require("../models/Meal");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const popularMeals = await Meal.find()
      .sort({ rating: -1 })
      .limit(6);

    res.render("index", {
      popularMeals
    });
  } catch (error) {
    console.error("Error loading homepage:", error);
    res.status(500).send("Something went wrong.");
  }
});

module.exports = router;