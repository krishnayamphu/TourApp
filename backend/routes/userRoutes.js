const express = require("express");
var fs = require("fs");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/authMiddleware");
const saltRounds = 10;
const storage = multer.diskStorage({
  destination: "./uploads/profile/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const uploadDirectory = path.join(__dirname, "../uploads/profile"); // Define your upload directory

router.get("/uploads/:filename", (req, res) => {
  console.log("File requested:", req.body); // Log the requested filename
  const filePath = path.join(uploadDirectory, req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file.");
    }
  });
});

// Get all users
router.get("/", authMiddleware, (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// get user
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create user
router.post("/", upload.single("profile_pic"), (req, res) => {
  console.log("Form data:", req.body); // This will contain username, email, password
  console.log("Uploaded file:", req.file); // This will contain the file info
  console.log("profile:", req.file.filename);
  const { username, password, email } = req.body;
  const profile_pic = req.file.filename;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    db.query(
      "INSERT INTO users ( username, password, email, profile_pic) VALUES (?,?,?,?)",
      [username, hash, email, profile_pic],
      (err, result) => {
        if (err) throw err;
        const lastInsertedId = result.insertId;
        db.query(
          "SELECT * FROM users WHERE id = ?",
          [lastInsertedId],
          (err, results) => {
            if (err) throw err;
            res.json(results[0]);
          }
        );
      }
    );
    console.log(hash);
  });
  // Process your registration logic here

  res.json({
    message: "Registration received",
  });
});

// Update user
router.put("/:id", (req, res) => {
  const { username, password, email, profile_pic } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE users SET  username=?, password=?, email=?, profile_pic=? WHERE id = ?",
    [username, password, email, profile_pic, id],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Delete user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body.profile); // Log the ID of the user being deleted
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) throw err;
    const filePath = path.join(uploadDirectory, req.body.profile);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).send("Error deleting file.");
      }
    });
    res.sendStatus(200);
  });
});

module.exports = router;
