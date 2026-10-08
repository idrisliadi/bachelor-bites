
// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const path = require("path");

// const indexRoutes = require("./routes/index");
// const authRoutes = require("./routes/auth");
// const mealRoutes = require("./routes/meal");

// const app = express();

// const PORT = process.env.PORT || 3000;

// // -------------------------
// // MongoDB
// // -------------------------
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((error) => {
//     console.error("MongoDB error:", error);
//   });

// // -------------------------
// // Middleware
// // -------------------------

// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// );

// app.use(
//   express.static(
//     path.join(__dirname, "public")
//   )
// );

// // Make logged-in user available
// // in every EJS page.

// app.use((req, res, next) => {
//   res.locals.user = req.session.user || null;
//   next();
// });

// // -------------------------
// // Routes
// // -------------------------

// app.use("/", indexRoutes);

// app.use("/auth", authRoutes);

// app.use("/meals", mealRoutes);

// // -------------------------
// // 404
// // -------------------------

// app.use((req, res) => {
//   res.status(404).send("Page not found");
// });

// // -------------------------
// // Server
// // -------------------------

// // app.listen(PORT, () => {
// //   console.log(
// //     `Server running at http://localhost:${PORT}`
// //   );
// // });

// // if (process.env.NODE_ENV !== "production") {
// //   app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// //   });
// // }

// // module.exports = app;



// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

// module.exports = app;

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const mealRoutes = require("./routes/meal");

const app = express();

const PORT = process.env.PORT || 3000;

// -------------------------
// View engine
// -------------------------

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------------------------
// MongoDB
// -------------------------

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB error:", error);
  });

// -------------------------
// Middleware
// -------------------------

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static(path.join(__dirname, "public")));

// Make logged-in user available
// in every EJS page.

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// -------------------------
// Routes
// -------------------------

app.use("/", indexRoutes);

app.use("/auth", authRoutes);

app.use("/meals", mealRoutes);

// -------------------------
// 404
// -------------------------

app.use((req, res) => {
  res.status(404).send("Page not found");
});

// -------------------------
// Server
// -------------------------

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;