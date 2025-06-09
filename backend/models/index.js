const sequelize = require("../config/db");
const User = require("./userModel");
const Tour = require("./tourModel");
const Booking = require("./bookingModel");
const Review = require("./reviewModel");

// Define associations
User.hasMany(Booking, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

User.hasMany(Review, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

Booking.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
Review.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

Tour.hasMany(Booking, {
  as: "bookings",
  foreignKey: { name: "tourId", allowNull: false },
  onDelete: "CASCADE",
});
Tour.hasMany(Review, {
  as: "reviews",
  foreignKey: { name: "tourId", allowNull: false },
  onDelete: "CASCADE",
});

Booking.belongsTo(Tour, {
  foreignKey: { name: "tourId", allowNull: false },
  onDelete: "CASCADE",
});
Review.belongsTo(Tour, {
  foreignKey: { name: "tourId", allowNull: false },
  onDelete: "CASCADE",
});

// Export all models
module.exports = {
  sequelize,
  User,
  Tour,
  Review,
};
