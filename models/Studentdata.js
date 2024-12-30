import { Sequelize, DataTypes } from "sequelize";

export const createStudentSchema = async (sequelize) => {
  const Studentdata = sequelize.define(
    "Studentdata",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Prevent null values
        validate: {
          notEmpty: true, // Prevent empty strings
        },
      },
      age: {
        type: DataTypes.INTEGER, // Use INTEGER for numeric fields like age
        allowNull: false, // Prevent null values
        validate: {
          notEmpty: true, // Prevent empty strings
          isInt: true, // Ensure the value is an integer
          min: 0, // Optionally enforce a minimum value
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Prevent null values
        unique: true, // Ensure email addresses are unique
        validate: {
          notEmpty: true, // Prevent empty strings
          isEmail: true, // Validate email format
        },
      },
      course: {
        type: DataTypes.STRING, // STRING is appropriate here
        allowNull: true, // It's optional
      },
    },
    {
      tableName: "Studentdata", // Optional: To explicitly set the table name
      timestamps: false, // Set to true if you want Sequelize to manage createdAt and updatedAt fields automatically
    }
  );
  return Studentdata;
};