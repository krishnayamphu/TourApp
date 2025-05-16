require("dotenv").config();
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middlewares/error");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tourRoutes = require("./routes/tourRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const port = 3000;
const corsOptions = { origin: "*" };

app.use(express.json());
app.use(cors(corsOptions));

const { sequelize } = require("./models");
// sequelize.sync({ force: true }); // or { alter: true } if safer
sequelize
  .sync({ alter: true })
  .then(() => console.log("Database schema updated"))
  .catch((err) => console.error("Sync error:", err));

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(globalErrorHandler);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
