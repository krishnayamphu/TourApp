const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Tour = require("./tourModel");
const Booking = sequelize.define(
  "Booking",
  {
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    participants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "paid",
        "request cancelled",
        "cancelled"
      ),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Booking;
