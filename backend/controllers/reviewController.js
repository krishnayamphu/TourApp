const Review = require("../models/reviewModel");
const appError = require("../utils/appError");

// Get all reviews
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll();

    res.status(200).json({
      status: "success",
      results: reviews.length,
      reviews,
    });
  } catch (err) {
    next(err);
  }
};

// Get review by ID
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);

    res.status(200).json({
      status: "success",
      review,
    });
  } catch (err) {
    next(err);
  }
};

// Get review by TourID
exports.getReviewsByTourId = async (req, res, next) => {
  try {
    const tourId = req.params.tourId;
    const reviews = await Review.findAll({ where: { tourId } });

    res.status(200).json({
      status: "success",
      results: reviews.length,
      reviews,
    });
  } catch (err) {
    next(err);
  }
};

// create a review
exports.saveReview = async (req, res, next) => {
  const { tourId, userId, review, rating } = req.body;

  try {
    const newReview = await Review.create({
      tourId,
      userId,
      review,
      rating,
    });

    res.status(201).json({
      status: "success",
      message: "Review created",
      review: {
        id: newReview.id,
        tourId: newReview.tourId,
        userId: newReview.userId,
        review: newReview.review,
        rating: newReview.rating,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update review
exports.updateReview = async (req, res, next) => {
  const { tourId, userId, review, rating } = req.body;

  try {
    const rev = await Review.findByPk(req.params.id);
    if (!rev) return next(appError("Review not found", 404));

    rev.tourId = tourId || rev.tourId;
    rev.userId = userId || rev.userId;
    rev.review = review || rev.review;
    rev.rating = rating || rev.rating;

    await rev.save();

    res.status(200).json({
      status: "success",
      review: {
        id: rev.id,
        tourId: rev.tourId,
        userId: rev.userId,
        review: rev.review,
        rating: rev.rating,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Delete a review (deactivate or delete)
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return next(appError("Review not found", 404));

    await review.destroy(); // or set active = false if using soft delete
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    next(err);
  }
};
