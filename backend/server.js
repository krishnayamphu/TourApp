require("dotenv").config();
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middlewares/error");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const port = 3000;
const corsOptions = { origin: "*" };

app.use(express.json());
app.use(cors(corsOptions));

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(globalErrorHandler);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
