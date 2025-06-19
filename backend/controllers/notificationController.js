const { Notification } = require("../models");
const Booking = require("../models/bookingModel");
const appError = require("../utils/appError");

// Get all bookings
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.findAll();

    res.status(200).json({
      status: "success",
      results: notifications.length,
      notifications,
    });
  } catch (err) {
    next(err);
  }
};

// Get booking by ID
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    res.status(200).json({
      status: "success",
      booking,
    });
  } catch (err) {
    next(err);
  }
};

// Get bookings by TourID
exports.getBookingsByTourId = async (req, res, next) => {
  try {
    const tourId = req.params.tourId;
    const bookings = await Booking.findAll({ where: { tourId } });

    res.status(200).json({
      status: "success",
      results: bookings.length,
      bookings,
    });
  } catch (err) {
    next(err);
  }
};

// create a notification
exports.saveNotification = async (req, res, next) => {
  const { userId, message } = req.body;
  const bookingId = 1; // Example booking ID, replace with actual logic if needed
  try {
    const notification = await Notification.create({
      bookingId,
      userId,
      message,
    });

    req.io.emit("admin-notification", notification); // Broadcast to all admins

    res.status(201).json({ success: true, notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save notification" });
  }
};

// Update notification status
exports.updateNotificationStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return next(appError("notification not found", 404));

    notification.status = status || notification.status;
    await notification.save();

    res.status(200).json({
      status: "success",
      bookingUpdate: {
        id: booking.id,
        tourId: booking.tourId,
        userId: booking.userId,
        price: booking.price,
        date: booking.date,
        participants: booking.participants,
      },
    });
  } catch (err) {
    next(err);
  }
};
