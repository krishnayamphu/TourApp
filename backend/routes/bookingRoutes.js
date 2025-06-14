const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  saveBooking,
  updateBooking,
  getAllBookings,
  getBooking,
  getBookingsByUserId,
  updateBookingStatus,
} = require("../controllers/bookingController");

/* protected routes */
router.get("/", protect, getAllBookings);
router.get("/:id", protect, getBooking);
router.get("/user/:id", protect, getBookingsByUserId);
router.post("/", protect, saveBooking);
router.put("/:id", protect, updateBooking);
router.put("/status/:id", protect, updateBookingStatus);

module.exports = router;
