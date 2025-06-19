const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define(
  "Notification",
  {
    bookingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Notification;
