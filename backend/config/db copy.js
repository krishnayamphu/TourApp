const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
const config = require("./config");

// Load environment variables
// require("dotenv").config();

// Determine environment
const env = process.env.NODE_ENV || "development";
const { database, username, password, host, port, dialect, dialectModule } =
  config[env];

// Create Sequelize instance
const sequelize = new Sequelize(database, username, password, {
  host,
  port: port || 3306,
  dialect: "mysql",
});

// Load all models from the models directory
async function loadModels() {
  const fs = require("fs");
  const path = require("path");
  const models = {};

  fs.readdirSync(path.join(__dirname, "models"))
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== "index.js" &&
        file.slice(-3) === ".js"
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, "models", file))(
        sequelize,
        Sequelize.DataTypes
      );
      models[model.name] = model;
    });

  // Set up model associations
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  logger.info("Database models loaded successfully");
  return models;
}

// Synchronize all models with the database
async function syncDatabase(options = {}) {
  try {
    await sequelize.sync(options);
    console.log("Database synchronized successfully");
  } catch (error) {
    console.log("Database synchronization failed:", error);
    throw error;
  }
}

// Close the database connection
async function closeConnection() {
  try {
    await sequelize.close();
    console.log("Database connection closed");
  } catch (error) {
    console.log("Error closing database connection:", error);
    throw error;
  }
}

// Initialize the database
async function initializeDatabase() {
  await testConnection();
  const models = await loadModels();
  return { sequelize, models };
}

// Export functionality
module.exports = {
  initializeDatabase,
  syncDatabase,
  closeConnection,
  getSequelize: () => sequelize,
  transaction: () => sequelize.transaction(),
};
