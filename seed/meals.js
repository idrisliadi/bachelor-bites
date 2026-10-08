
require("dotenv").config();

const mongoose = require("mongoose");

const Meal = require("../models/Meal");

const meals = [

  {
    name: "Indomie & Egg",

    description:
      "The ultimate quick bachelor meal.",

    category: "dinner",

    prepTime: 2,

    cookTime: 8,

    cost: 1000,

    difficulty: "easy",

    rating: 4.7,

    tags: [
      "quick",
      "cheap",
      "comfort"
    ],

    ingredients: [
      {
        name: "indomie",
        quantity: "2 packs"
      },
      {
        name: "egg",
        quantity: "2"
      },
      {
        name: "onion",
        quantity: "1/2"
      },
      {
        name: "pepper",
        quantity: "1"
      }
    ],

    instructions: [
      "Boil water.",
      "Add the noodles.",
      "Add seasoning.",
      "Fry or boil the eggs.",
      "Add onion and pepper.",
      "Serve hot."
    ]
  },

  {
    name: "Egg & Bread",

    description:
      "Simple fried egg with fresh bread.",

    category: "breakfast",

    prepTime: 3,

    cookTime: 7,

    cost: 900,

    difficulty: "easy",

    rating: 4.5,

    tags: [
      "quick",
      "cheap"
    ],

    ingredients: [
      {
        name: "egg",
        quantity: "2"
      },
      {
        name: "bread",
        quantity: "4 slices"
      },
      {
        name: "onion",
        quantity: "1/2"
      },
      {
        name: "pepper",
        quantity: "1"
      },
      {
        name: "oil",
        quantity: "1 tbsp"
      }
    ],

    instructions: [
      "Beat the eggs.",
      "Add chopped onion and pepper.",
      "Heat oil.",
      "Fry the egg.",
      "Toast the bread.",
      "Serve."
    ]
  },

  {
    name: "Jollof Rice & Chicken",

    description:
      "Classic Nigerian jollof rice with chicken.",

    category: "dinner",

    prepTime: 15,

    cookTime: 40,

    cost: 3500,

    difficulty: "medium",

    rating: 4.9,

    tags: [
      "comfort",
      "popular"
    ],

    ingredients: [
      {
        name: "rice",
        quantity: "2 cups"
      },
      {
        name: "chicken",
        quantity: "2 pieces"
      },
      {
        name: "tomato",
        quantity: "4"
      },
      {
        name: "onion",
        quantity: "1"
      },
      {
        name: "pepper",
        quantity: "2"
      },
      {
        name: "oil",
        quantity: "3 tbsp"
      }
    ],

    instructions: [
      "Blend tomatoes, pepper and onion.",
      "Fry the blended mixture.",
      "Add washed rice.",
      "Add stock and seasoning.",
      "Cook until rice is soft.",
      "Cook the chicken.",
      "Serve together."
    ]
  },

  {
    name: "Spaghetti & Tomato Sauce",

    description:
      "Easy spaghetti with tomato sauce.",

    category: "dinner",

    prepTime: 10,

    cookTime: 20,

    cost: 2200,

    difficulty: "easy",

    rating: 4.6,

    tags: [
      "easy",
      "comfort"
    ],

    ingredients: [
      {
        name: "spaghetti",
        quantity: "250g"
      },
      {
        name: "tomato",
        quantity: "4"
      },
      {
        name: "onion",
        quantity: "1"
      },
      {
        name: "pepper",
        quantity: "2"
      },
      {
        name: "oil",
        quantity: "2 tbsp"
      }
    ],

    instructions: [
      "Boil spaghetti.",
      "Blend tomatoes, onion and pepper.",
      "Fry the sauce.",
      "Add seasoning.",
      "Mix spaghetti with sauce."
    ]
  },

  {
    name: "Beans & Plantain",

    description:
      "Filling beans with fried ripe plantain.",

    category: "lunch",

    prepTime: 10,

    cookTime: 45,

    cost: 2500,

    difficulty: "medium",

    rating: 4.8,

    tags: [
      "comfort",
      "healthy"
    ],

    ingredients: [
      {
        name: "beans",
        quantity: "2 cups"
      },
      {
        name: "plantain",
        quantity: "2"
      },
      {
        name: "onion",
        quantity: "1"
      },
      {
        name: "pepper",
        quantity: "2"
      },
      {
        name: "oil",
        quantity: "3 tbsp"
      }
    ],

    instructions: [
      "Wash beans.",
      "Boil until soft.",
      "Add onion and pepper.",
      "Season.",
      "Slice plantain.",
      "Fry plantain until golden.",
      "Serve."
    ]
  },

  {
    name: "Fried Rice & Chicken",

    description:
      "Simple fried rice with chicken.",

    category: "lunch",

    prepTime: 15,

    cookTime: 25,

    cost: 3500,

    difficulty: "medium",

    rating: 4.8,

    tags: [
      "comfort",
      "popular"
    ],

    ingredients: [
      {
        name: "rice",
        quantity: "2 cups"
      },
      {
        name: "chicken",
        quantity: "2 pieces"
      },
      {
        name: "carrot",
        quantity: "1"
      },
      {
        name: "peas",
        quantity: "1/2 cup"
      },
      {
        name: "onion",
        quantity: "1"
      },
      {
        name: "oil",
        quantity: "2 tbsp"
      }
    ],

    instructions: [
      "Cook the rice.",
      "Cook the chicken.",
      "Chop the vegetables.",
      "Fry the vegetables.",
      "Add cooked rice.",
      "Add seasoning.",
      "Add chicken and serve."
    ]
  },

  {
    name: "Chicken Sandwich",

    description:
      "Fast chicken sandwich for lunch.",

    category: "lunch",

    prepTime: 10,

    cookTime: 10,

    cost: 2500,

    difficulty: "easy",

    rating: 4.5,

    tags: [
      "quick",
      "easy"
    ],

    ingredients: [
      {
        name: "bread",
        quantity: "4 slices"
      },
      {
        name: "chicken",
        quantity: "150g"
      },
      {
        name: "tomato",
        quantity: "1"
      },
      {
        name: "lettuce",
        quantity: "2 leaves"
      },
      {
        name: "mayonnaise",
        quantity: "1 tbsp"
      }
    ],

    instructions: [
      "Cook the chicken.",
      "Slice vegetables.",
      "Toast bread.",
      "Add mayonnaise.",
      "Add chicken and vegetables.",
      "Serve."
    ]
  }

];

async function seed() {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected"
    );

    await Meal.deleteMany();

    await Meal.insertMany(
      meals
    );

    console.log(
      `${meals.length} meals inserted`
    );

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
}

seed();