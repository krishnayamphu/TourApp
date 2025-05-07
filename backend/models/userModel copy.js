const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide your name",
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          msg: "Email already exists",
        },
        validate: {
          isEmail: {
            msg: "Please provide a valid email",
          },
          notEmpty: {
            msg: "Please provide your email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 100],
            msg: "Password must be between 8 and 100 characters",
          },
          notEmpty: {
            msg: "Please provide a password",
          },
        },
      },
      passwordConfirm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please confirm your password",
          },
          // Custom validator to check if passwords match
          isConfirmed(value) {
            if (value !== this.password) {
              throw new Error("Passwords do not match");
            }
          },
        },
      },
      role: {
        type: DataTypes.ENUM("user", "admin", "guide"),
        defaultValue: "user",
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "default.jpg",
      },
      passwordChangedAt: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.DATE,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      paranoid: true, // Enable soft deletion
      defaultScope: {
        attributes: {
          exclude: [
            "password",
            "passwordConfirm",
            "passwordChangedAt",
            "passwordResetToken",
            "passwordResetExpires",
          ],
        },
      },
      scopes: {
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
    }
  );

  // Instance methods
  User.prototype.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

  User.prototype.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  };

  User.prototype.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
  };

  // Hooks
  User.beforeSave(async (user, options) => {
    // Only run this function if password was actually modified
    if (!user.changed("password")) return;

    // Hash the password with cost of 12
    user.password = await bcrypt.hash(user.password, 12);

    // Delete passwordConfirm field
    user.passwordConfirm = undefined;
  });

  User.beforeUpdate(async (user, options) => {
    if (user.changed("password") && !user.isNewRecord) {
      user.passwordChangedAt = Date.now() - 1000;
    }
  });

  // Associations will be defined elsewhere
  User.associate = function (models) {
    User.hasMany(models.Booking, {
      foreignKey: "userId",
      as: "bookings",
    });

    User.hasMany(models.Review, {
      foreignKey: "userId",
      as: "reviews",
    });
  };

  return User;
};
