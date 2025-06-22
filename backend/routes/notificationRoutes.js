const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  getNotifications,
  saveNotification,
  updateNotificationStatus,
  getUnReadNotifications,
  getUnReadNotificationsByUserId,
} = require("../controllers/notificationController");

/* protected routes */
router.get("/", protect, getNotifications);
router.get("/unread", protect, getUnReadNotifications);
router.get("/unread/:userId", protect, getUnReadNotificationsByUserId);
router.post("/", protect, saveNotification);
router.put("/status/:id", protect, updateNotificationStatus);
module.exports = router;
