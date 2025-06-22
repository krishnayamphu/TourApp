const { Notification } = require("../models");
const appError = require("../utils/appError");

// Get all notifications
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      results: notifications.length,
      notifications,
    });
  } catch (err) {
    next(err);
  }
};

// Get all unread notifications
exports.getUnReadNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.findAll({
      where: { isRead: false },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      results: notifications.length,
      notifications,
    });
  } catch (err) {
    next(err);
  }
};
// Get all unread notifications by userId
exports.getUnReadNotificationsByUserId = async (req, res, next) => {
  try {
    const notifications = await Notification.findAll({
      where: { isRead: false },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      results: notifications.length,
      notifications,
    });
  } catch (err) {
    next(err);
  }
};

// create a notification
exports.saveNotification = async (req, res) => {
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
