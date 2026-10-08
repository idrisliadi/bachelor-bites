const express = require("express");

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

// -------------------------
// Register page
// -------------------------

router.get(
  "/register",
  (req, res) => {
    res.render(
      "auth/register",
      {
        error: null
      }
    );
  }
);

// -------------------------
// Register
// -------------------------

router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {
        return res.render(
          "auth/register",
          {
            error:
              "Please fill in all fields."
          }
        );
      }

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {
        return res.render(
          "auth/register",
          {
            error:
              "Email already registered."
          }
        );
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword
        });

      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email
      };

      res.redirect("/");
    } catch (error) {
      console.error(error);

      res.render(
        "auth/register",
        {
          error:
            "Something went wrong."
        }
      );
    }
  }
);

// -------------------------
// Login page
// -------------------------

router.get(
  "/login",
  (req, res) => {
    res.render(
      "auth/login",
      {
        error: null
      }
    );
  }
);

// -------------------------
// Login
// -------------------------

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;

      const user =
        await User.findOne({
          email
        });

      if (!user) {
        return res.render(
          "auth/login",
          {
            error:
              "Invalid email or password."
          }
        );
      }

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!validPassword) {
        return res.render(
          "auth/login",
          {
            error:
              "Invalid email or password."
          }
        );
      }

      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email
      };

      res.redirect("/");
    } catch (error) {
      console.error(error);

      res.render(
        "auth/login",
        {
          error:
            "Something went wrong."
        }
      );
    }
  }
);

// -------------------------
// Logout
// -------------------------

router.post(
  "/logout",
  (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  }
);

module.exports = router;