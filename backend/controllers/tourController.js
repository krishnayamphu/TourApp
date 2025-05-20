const User = require("../models/userModel");
const Tour = require("../models/tourModel");
const Review = require("../models/reviewModel");
const appError = require("../utils/appError");

// Upload avatar
exports.uploadAvatar = async (req, res, next) => {
  if (!req.file) return next(appError("No file uploaded", 400));

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return next(appError("User not found", 404));

    user.avatar = req.file.filename;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Avatar uploaded successfully",
      avatar: user.avatar,
    });
  } catch (err) {
    next(err);
  }
};

// Get all tours
exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await Tour.findAll();

    res.status(200).json({
      status: "success",
      results: tours.length,
      tours,
    });
  } catch (err) {
    next(err);
  }
};

// Get tour by ID
exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByPk(req.params.id);

    res.status(200).json({
      status: "success",
      tour,
    });
  } catch (err) {
    next(err);
  }
};

// create a Tour
exports.saveTour = async (req, res, next) => {
  if (!req.file) return next(appError("No file uploaded", 400));
  console.log("req.body:", req.body);
  const {
    title,
    slug,
    description,
    summary,
    duration,
    maxGroupSize,
    difficulty,
    price,
    priceDiscount,
    startDates,
    startLocation,
    locations,
    images,
    isActive,
  } = req.body;
  console.log(locations);
  try {
    const existing = await Tour.findOne({ where: { slug } });
    if (existing) return next(appError("Slug already exists", 400));
    console.log("req.file", req.file);
    const coverImage = req.file.filename;
    const newTour = await Tour.create({
      title,
      slug,
      description,
      summary,
      duration,
      maxGroupSize,
      difficulty,
      price,
      priceDiscount,
      startDates,
      startLocation,
      locations,
      coverImage,
      images,
      isActive,
    });

    res.status(201).json({
      status: "success",
      message: "Tour created",
      tour: {
        id: newTour.id,
        title: newTour.title,
        slug: newTour.slug,
        description: newTour.description,
        summary: newTour.summary,
        duration: newTour.duration,
        maxGroupSize: newTour.maxGroupSize,
        difficulty: newTour.difficulty,
        price: newTour.price,
        priceDiscount: newTour.priceDiscount,
        startDates: newTour.startDates,
        startLocation: newTour.startLocation,
        locations: newTour.locations,
        coverImage: newTour.coverImage,
        images: newTour,
        isActive: newTour.isActive,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Delete a tour (deactivate or delete)
exports.deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) return next(appError("Tour not found", 404));

    await tour.destroy(); // or set active = false if using soft delete

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    next(err);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id; // Assuming you're passing the user ID in the URL
    const user = await User.findByPk(id);
    if (!user) return next(appError("User not found", 404));

    await user.destroy(); // or set active = false if using soft delete

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    next(err);
  }
};

// Get tour's reviews
exports.getTourReviews = async (req, res, next) => {
  try {
    console.log("req.tour.id", req.params.id);
    const tour = await Tour.findByPk(req.params.id, {
      attributes: ["id", "title"],
      include: [
        {
          model: Review,
          attributes: ["id", "review", "rating"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      tour,
    });
  } catch (err) {
    next(err);
  }
};
