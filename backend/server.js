require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const http = require("http");
const { Server } = require("socket.io");
const globalErrorHandler = require("./middlewares/error");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tourRoutes = require("./routes/tourRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const notificationSocket = require("./sockets/notificationSocket");
const app = express();
const port = 3000;
const corsOptions = { origin: "*" };
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: corsOptions });

// sequelize.sync({ force: true }); // or { alter: true } if safer
const { sequelize } = require("./models");
sequelize
  .sync({ alter: true })
  .then(() => console.log("Database schema updated"))
  .catch((err) => console.error("Sync error:", err));

app.use(express.json());
app.use(cors(corsOptions));
app.use(globalErrorHandler);
// Pass io to the route
app.use((req, res, next) => {
  req.io = io;
  next();
});
// api routes
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notify", notificationRoutes);
app.post("/api/send-mail", async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "mail.sktechpoint.com",
    port: 465,
    secure: true,
    auth: {
      user: "test@sktechpoint.com",
      pass: "hello.com123",
    },
  });

  try {
    await transporter.sendMail({
      from: "Krishna Yamphu <test@sktechpoint.com>",
      to: "krishnayamphu@gmail.com", // or a fixed receiver email
      subject: "Test Email from Node.js",
      html: `<p>Hello World</p>`,
    });

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// WebSocket connection
notificationSocket(io);

httpServer.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
