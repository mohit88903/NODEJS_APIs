import { Sequelize, DataTypes } from "sequelize";

export const createUserSchema = async (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Model attributes are defined here
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING, // Use STRING for email as well
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING, // Use STRING for password
        allowNull: false,
      },
      confirmpassword: {
        type: DataTypes.STRING, // Use STRING for confirm password
        allowNull: true,
      },
    },
    {
      tableName: "users", // Optional: To explicitly set the table name
      timestamps: false, // Set to true if you want Sequelize to manage createdAt and updatedAt fields automatically
    }
  );
  return User;
};
