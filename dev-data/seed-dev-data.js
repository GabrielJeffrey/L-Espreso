/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-console */
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Foods = require("../Models/foodModel");
const User = require("../Models/userModel");
const Review = require("../Models/reviewModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("\nDB CONNECTION SUCCESS\n"));

// Read Json File
const foods = JSON.parse(fs.readFileSync(`${__dirname}/foods.json`, "utf-8"));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
// );

// Import Data Into DB
const importData = async () => {
  try {
    await Foods.create(foods);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log("Data successfully seeded");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Delete All Data From DB
const deleteData = async () => {
  try {
    await Foods.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log("Data successfully deleted");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--seed") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
