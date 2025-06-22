const Booking = require("../models/bookingModel");
const Notification = require("../models/notificationModel");
const appError = require("../utils/appError");

// Get all bookings
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll();

    res.status(200).json({
      status: "success",
      results: bookings.length,
      bookings,
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

// Get bookings by UserID
exports.getBookingsByUserId = async (req, res, next) => {
  try {
    console.log("Fetching bookings for user ID:", req.params.id);
    const userId = req.params.id;
    const bookings = await Booking.findAll({ where: { userId } });

    res.status(200).json({
      status: "success",
      results: bookings.length,
      bookings,
    });
  } catch (err) {
    next(err);
  }
};

// create a booking
exports.saveBooking = async (req, res, next) => {
  const { tourId, userId, price, date, participants } = req.body;
  try {
    const newBooking = await Booking.create({
      tourId,
      userId,
      price,
      date,
      participants,
    });

    res.status(201).json({
      status: "success",
      message: "Booking created",
      booking: {
        id: newBooking.id,
        tourId: newBooking.tourId,
        userId: newBooking.userId,
        price: newBooking.price,
        date: newBooking.date,
        participants: newBooking.participants,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update booking
exports.updateBooking = async (req, res, next) => {
  const { tourId, userId, price, date, participants } = req.body;

  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return next(appError("booking not found", 404));

    booking.tourId = tourId || booking.tourId;
    booking.userId = userId || booking.userId;
    booking.price = price || booking.price;
    booking.date = date || booking.date;
    booking.participants = participants || booking.participants;

    await participants.save();

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

// Update booking status
exports.updateBookingStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return next(appError("booking not found", 404));

    booking.status = status || booking.status;
    await booking.save();
    // Send notification to client if marked as paid
    if (status === "paid") {
      const clientNotification = await Notification.create({
        userId: booking.userId,
        bookingId: booking.id,
        message: "Your booking has been marked as paid. Thank you!",
      });
      const roomId = `user-${booking.userId}`;
      req.io.to(roomId).emit("client-notification", clientNotification);
    }

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
// Delete a booking (deactivate or delete)
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return next(appError("Booking not found", 404));

    await booking.destroy(); // or set active = false if using soft delete
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    next(err);
  }
};
