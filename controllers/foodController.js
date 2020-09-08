/* eslint-disable node/no-unsupported-features/es-syntax */
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");

const Foods = require("../models/foodModel");
const Review = require("../models/reviewModel");

exports.getAllFoods = factory.getAll(Foods);
exports.createFood = factory.createOne(Foods);

exports.getFood = catchAsync(async (req, res, next) => {
  let query = Foods.findOne({ slug: req.params.slug });
  query = query.populate({ path: "reviews" });
  const food = await query;

  if (!food) {
    return next(new AppError("No Food found with that name", 404));
  }

  res.status(200).json({
    status: "success",
    data: food,
  });
});

exports.updateFood = factory.updateOne(Foods);
exports.deleteFood = factory.deleteOne(Foods);

exports.getAllReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
