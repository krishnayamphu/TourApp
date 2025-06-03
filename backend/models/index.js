const sequelize = require("../config/db");
const User = require("./userModel");
const Tour = require("./tourModel");
const Review = require("./reviewModel");

// Define associations
User.hasMany(Review, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
Review.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

Tour.hasMany(Review, {
  as: "reviews",
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
