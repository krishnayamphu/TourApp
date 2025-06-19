const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  saveReview,
  updateReview,
  getAllReviews,
} = require("../controllers/reviewController");

/* protected routes */
router.get("/", protect, getAllReviews);
router.post("/", protect, saveReview);
router.put("/:id", protect, updateReview);

module.exports = router;
