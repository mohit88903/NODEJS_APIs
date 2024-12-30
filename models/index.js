import { createStudentSchema } from "./Studentdata.js";
import { createUserSchema } from "./userTable.js";


export const getAllModels = async (sequelize) => {
    let objModels = {};
    objModels.User = await createUserSchema(sequelize);
    objModels.Studentdata = await createStudentSchema(sequelize);
    objModels.sequelize = sequelize;
  
    return objModels;
  };