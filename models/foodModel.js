const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Food must have a name"],
      unique: true,
      trim: true,
      minlength: [10, "A food name must have more or equal to 10 characters"],
      maxlength: [40, "A food name must have less or equal to 40 characters"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A Food must have a Summary"],
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minLength: [10, "Description Must be greater than 10 characters"],
      maxLength: [250, "Description Cant be greater than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "A Food must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        message: "Discount price ({VALUE}) should be below regular price",
        validator(val) {
          return val < this.price;
        },
      },
    },
    image: String,
    slug: String,
    premiumOnly: {
      type: Boolean,
      default: false,
    },
    customisable: {
      type: Boolean,
      required: true,
      default: false,
    },
    veg: {
      type: Boolean,
      required: true,
      default: false,
    },
    nonVeg: {
      type: Boolean,
      required: true,
      default: false,
    },
    containsEgg: {
      type: Boolean,
      required: true,
      default: false,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      max: [5, "Rating must be below 5"],
      set: (value) => Math.round(value * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["pizza", "burger", "beverage", "noodle", "dessert"],
      default: "other",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// * Virtual Populate
foodSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "food",
  localField: "_id",
});

// * DOCUMENT MIDDLEWARE: runs before .save() and .create()
foodSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  this.image = this.slug;
  next();
});

const Foods = mongoose.model("Foods", foodSchema);
module.exports = Foods;
