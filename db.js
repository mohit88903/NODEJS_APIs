import { Sequelize } from "sequelize";
import { getAllModels } from "./models/index.js";

var moduleSchemas = null;
export const createConnection = async () => {
  const sequelize = new Sequelize("user_singup", "root", "9060024509", {
    host: "localhost",
    dialect: "mysql",
  });

  try {
    await sequelize.authenticate();
    moduleSchemas = await getAllModels(sequelize);
    /////// syncing all schemas
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { moduleSchemas };