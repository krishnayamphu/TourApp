const express = require("express");
const router = express.Router();
const { uploadAvatar, getAllUsers } = require("../controllers/userController");
const { protect, restrictTo } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", protect, restrictTo("admin"), getAllUsers);

router.post("/upload-avatar", protect, upload.single("avatar"), uploadAvatar);

module.exports = router;
