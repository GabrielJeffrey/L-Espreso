// review / rating / createdAt / ref to food / ref to user
const mongoose = require("mongoose");
const Food = require("./foodModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    food: {
      type: mongoose.Schema.ObjectId,
      ref: "Foods",
      required: [true, "Review must belong to a food."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ food: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name avatar",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (foodId) {
  const stats = await this.aggregate([
    {
      $match: { food: foodId },
    },
    {
      $group: {
        _id: "$food",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Food.findByIdAndUpdate(foodId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Food.findByIdAndUpdate(foodId, {
      ratingsQuantity: 0,
      ratingsAverage: 1,
    });
  }
};

reviewSchema.post("save", function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.food);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.food);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
