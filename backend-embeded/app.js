const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Connection to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => console.log("Server running on port:" + PORT));
  })
  .catch((e) => console.log(e));

// const User = require("./models/user.model.js");
const { getMovies, createMovie } = require("./controllers/movie.controller.js");
const { orderMovie } = require("./controllers/order.controller.js");
const {
  getUserInfo,
  userSignup,
  userLogin,
} = require("./controllers/user.controller.js");

// Routes
// -- POST /api/users/signup    |   User signup (creates new user)
app.post("/api/users/signup", userSignup);

// -- POST /api/users/login     |   User login (connects existing user)
app.post("/api/users/login", userLogin);

// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/movies", createMovie);

// -- GET /api/movies           |   Movie listing (retrieving all movies)
app.get("/api/movies", getMovies);

// -- GET /api/users/:id         |   User information (retrieving user information and his movies and orders)
app.get("/api/users/:id", getUserInfo);

// -- PUT /api/movies/:id       |   Movie update and order creation
app.put("/api/movies/:id", orderMovie);
