require("dotenv").config();
const express = require("express");
const cors = require("cors");
var fs = require("fs");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// 1) MIDDLEWARES
app.use(cors());
app.options("*", cors());

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
