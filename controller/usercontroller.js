import { moduleSchemas } from "../db.js";

export const createUser = async (req, res) => {
  let User = moduleSchemas.User;
  try {
    console.log(req);
    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
    });
    res.status(200).json({ status: "Success", data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error", data: error });
  }
};

export const getUser = async (req, res) => {
  let User = moduleSchemas.User;
  try {
    const users = await User.findAll(); // Fetch all records
    res.status(200).json({ status: "Success", data: users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error", data: error });
  }
};

export const updateUser = async (req, res) => {
  let User = moduleSchemas.User;
  try {
    const [rowsUpdated] = await User.update(
      {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      },

      {
        where: {
          id: req.body.id, // Condition for which rows to update
        },
      }
    );
    if (rowsUpdated > 0) {
      res
        .status(200)
        .json({ status: "Success", message: "updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error", data: error });
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


export const deleteUser = async (req, res) => {
  let User = moduleSchemas.User; // Assuming `User` is the Sequelize model
  const users = req.params.id; // Get the ID from the URL parameters

  if (!users) {
    return res.status(400).json({
      status: "Error",
      message: "User ID is required",
    });
  }

  try {
    const rowsDeleted = await User.destroy({
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


export const loginUser = async (req, res) => {
  let User = moduleSchemas.User;
  try {
    const { email, password } = req.body;

    // Step 1: Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    // Step 2: Check if the provided password matches the stored password
    if (user.password !== password) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid email or password",
      });
    }

    // Step 3: Successful login
    res.status(200).json({
      status: "Success",
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "Error",
      message: "Login failed",
      data: error,
    });
  }
};
