const express = require("express");
const foodController = require("../controllers/foodController");

const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(foodController.getAllFoods).post(foodController.createFood);

router
  .route("/:slug")
  .get(foodController.getFood)
  .patch(authController.restrictTo("admin"), foodController.updateFood)
  .delete(authController.restrictTo("admin"), foodController.deleteFood);

router.use(authController.protect);

router
  .route("/:id/reviews")
  .get(foodController.getAllReviews)
  .post((req, res, next) => {
    req.body.food = req.params.id;
    req.body.user = req.user.id;
    next();
  }, foodController.createReview)
  .patch(foodController.updateReview);

module.exports = router;
