const express = require("express");

const Meal = require("../models/Meal");
const User = require("../models/User");

const requireLogin =
  require("../middleware/auth");

const router = express.Router();

// -------------------------
// All meals
// -------------------------

router.get(
  "/",
  async (req, res) => {
    const {
      search,
      category,
      maxTime,
      maxBudget
    } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (maxBudget) {
      query.cost = {
        $lte: Number(maxBudget)
      };
    }

    if (maxTime) {
      query.$expr = {
        $lte: [
          {
            $add: [
              "$prepTime",
              "$cookTime"
            ]
          },
          Number(maxTime)
        ]
      };
    }

    if (search) {
      query.name = {
        $regex: search,
        $options: "i"
      };
    }

    const meals =
      await Meal.find(query)
        .sort({
          rating: -1
        });

    res.render(
      "meals/index",
      {
        meals,
        search,
        category,
        maxTime,
        maxBudget
      }
    );
  }
);

// -------------------------
// Recommendation page
// -------------------------

router.get(
  "/recommend",
  requireLogin,
  (req, res) => {
    res.render(
      "meals/recommend"
    );
  }
);

// -------------------------
// Generate recommendation
// -------------------------

router.post(
  "/recommend",
  requireLogin,
  async (req, res) => {
    try {
      const {
        mood,
        budget,
        maxTime
      } = req.body;

      const user =
        await User.findById(
          req.session.user.id
        );

      const userBudget =
        Number(budget) ||
        user.budget ||
        3000;

      const userTime =
        Number(maxTime) ||
        user.maxCookingTime ||
        30;

      const meals =
        await Meal.find({
          cost: {
            $lte: userBudget
          }
        });

      if (!meals.length) {
        return res.render(
          "meals/recommend",
          {
            error:
              "Sorry, no meals fit your budget.",
            meal: null
          }
        );
      }

      // Score each meal.

      const scoredMeals =
        meals.map((meal) => {
          let score = 0;

          const totalTime =
            meal.prepTime +
            meal.cookTime;

          // Time
          if (
            totalTime <= userTime
          ) {
            score += 30;
          }

          // Mood
          if (
            mood === "quick" &&
            totalTime <= 15
          ) {
            score += 30;
          }

          if (
            mood === "cheap" &&
            meal.cost <= 1500
          ) {
            score += 30;
          }

          if (
            mood === "comfort" &&
            meal.tags.includes(
              "comfort"
            )
          ) {
            score += 30;
          }

          // Easy meals
          if (
            meal.difficulty ===
            "easy"
          ) {
            score += 10;
          }

          // Rating
          score += meal.rating * 5;

          return {
            meal,
            score
          };
        });

      scoredMeals.sort(
        (a, b) =>
          b.score - a.score
      );

      const winner =
        scoredMeals[0].meal;

      res.render(
        "meals/recommend",
        {
          meal: winner,
          error: null
        }
      );
    } catch (error) {
      console.error(error);

      res.render(
        "meals/recommend",
        {
          meal: null,
          error:
            "Something went wrong."
        }
      );
    }
  }
);

// -------------------------
// Cook with what you have
// -------------------------

router.get(
  "/cook",
  requireLogin,
  (req, res) => {
    res.render(
      "meals/cook",
      {
        results: null,
        ingredients: ""
      }
    );
  }
);

router.post(
  "/cook",
  requireLogin,
  async (req, res) => {
    const ingredients =
      req.body.ingredients
        .split(",")
        .map((item) =>
          item.trim().toLowerCase()
        )
        .filter(Boolean);

    const meals =
      await Meal.find();

    const results =
      meals
        .map((meal) => {
          const mealIngredients =
            meal.ingredients.map(
              (ingredient) =>
                ingredient.name.toLowerCase()
            );

          const matches =
            ingredients.filter(
              (userIngredient) =>
                mealIngredients.some(
                  (mealIngredient) =>
                    mealIngredient.includes(
                      userIngredient
                    )
                )
            );

          return {
            meal,
            matches:
              matches.length
          };
        })
        .filter(
          (result) =>
            result.matches > 0
        )
        .sort(
          (a, b) =>
            b.matches -
            a.matches
        );

    res.render(
      "meals/cook",
      {
        results,
        ingredients:
          req.body.ingredients
      }
    );
  }
);

// -------------------------
// Meal details
// -------------------------

router.get(
  "/:id",
  async (req, res) => {
    const meal =
      await Meal.findById(
        req.params.id
      );

    if (!meal) {
      return res
        .status(404)
        .send(
          "Meal not found"
        );
    }

    res.render(
      "meals/show",
      {
        meal
      }
    );
  }
);

// -------------------------
// Favorite
// -------------------------

router.post(
  "/:id/favorite",
  requireLogin,
  async (req, res) => {
    const user =
      await User.findById(
        req.session.user.id
      );

    if (
      !user.favorites.includes(
        req.params.id
      )
    ) {
      user.favorites.push(
        req.params.id
      );

      await user.save();
    }

    res.redirect(
      `/meals/${req.params.id}`
    );
  }
);

module.exports = router;