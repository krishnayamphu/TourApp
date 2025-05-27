const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../middlewares/auth");
const upload = require("../middlewares/uploadMedia");
const {
  saveTour,
  getAllTours,
  getTour,
  deleteTour,
  getTourReviews,
} = require("../controllers/tourController");

/* public routes */
router.get("/reviews", getTourReviews);
router.get("/:id", getTour);
router.get("/", getAllTours);

/* admin routes */
router.post(
  "/",
  protect,
  restrictTo("admin"),
  upload.single("coverImage"),
  saveTour
);
router.delete("/:id", protect, restrictTo("admin"), deleteTour);

module.exports = router;
