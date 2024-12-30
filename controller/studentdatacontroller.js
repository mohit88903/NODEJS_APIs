import { moduleSchemas } from "../db.js";

 export const createStudent = async (req, res) => {
  let Studentdata = moduleSchemas.Studentdata;
  try {
    console.log(req);
    const user = await Studentdata.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      course: req.body.course,
    });
    res.status(200).json({ status: "Success", data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error", data: error });
  }
};


export const getStudent = async (req, res) => {
  let Studentdata = moduleSchemas.Studentdata;
  try {
    const users = await Studentdata.findAll(); // Fetch all records
    res.status(200).json({ status: "Success", data: users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error", data: error });
  }
};

// export const updateStudent = async (req, res) => {
//   let Studentdata = moduleSchemas.Studentdata;
//   try {
//     const [rowsUpdated] = await Studentdata.update(
//       {
//         name: req.body.name,
//       age: req.body.age,
//       email: req.body.email,
//       course: req.body.course,
//       },

//       {
//         where: {
//           id: req.body.id, // Condition for which rows to update
//         },
//       }
//     );
//     if (rowsUpdated > 0) {
//       res
//         .status(200)
//         .json({ status: "Success", message: "updated successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ status: "Error", data: error });
//   }
// };


export const updateStudent = async (req, res) => {
  let Studentdata = moduleSchemas.Studentdata; // Assuming this is your Sequelize model
  const userId = req.params.id; // Get the ID from the URL parameters
  const updatedData = req.body; // Get the updated data from the request body

  if (!userId) {
    return res.status(400).json({
      status: "Error",
      message: "User ID is required",
    });
  }

  try {
    // Update the student record
    const [rowsUpdated] = await Studentdata.update(updatedData, {
      where: {
        id: userId, // Match the record with the provided ID
      },
    });

    if (rowsUpdated > 0) {
      return res.status(200).json({
        status: "Success",
        message: `User with ID ${userId} updated successfully`,
      });
    } else {
      return res.status(404).json({
        status: "Error",
        message: `User with ID ${userId} not found`,
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      status: "Error",
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
};




// export const deleteUser = async (req, res) => {
//   let User = moduleSchemas.User;
//   try {
//     const rowsDeleted = await User.destroy({
//       where: {
//         id: req.body.id, // Condition to match the record to delete
//       },
//     });
//     if (rowsDeleted > 0) {
//       res
//         .status(200)
//         .json({ status: "Success", message: "deleted successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ status: "Error", data: error });
//   }
// };


export const deleteStudent = async (req, res) => {
  let Studentdata = moduleSchemas.Studentdata; // Assuming `User` is the Sequelize model
  const users = req.params.id; // Get the ID from the URL parameters

  if (!users) {
    return res.status(400).json({
      status: "Error",
      message: "User ID is required",
    });
  }

  try {
    const rowsDeleted = await Studentdata.destroy({
      where: {
        id: users, // Match the record with the provided ID
      },
    });

    if (rowsDeleted > 0) {
      return res.status(200).json({
        status: "Success",
        message: `User with ID ${users} deleted successfully`,
      });
    } else {
      return res.status(404).json({
        status: "Error",
        message: `User with ID ${users} not found`,
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      status: "Error",
      message: "An error occurred while deleting the user",
      error: error.message,
    });
  }
};


// export const loginUser = async (req, res) => {
//   let User = moduleSchemas.User;
//   try {
//     const { email, password } = req.body;

//     // Step 1: Find user by email
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({
//         status: "Error",
//         message: "User not found",
//       });
//     }

//     // Step 2: Check if the provided password matches the stored password
//     if (user.password !== password) {
//       return res.status(401).json({
//         status: "Error",
//         message: "Invalid email or password",
//       });
//     }

//     // Step 3: Successful login
//     res.status(200).json({
//       status: "Success",
//       message: "Login successful",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       status: "Error",
//       message: "Login failed",
//       data: error,
//     });
//   }
// };