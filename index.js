import cors from "cors";
import express from "express";
import { createConnection } from "./db.js";
import { createUser, deleteUser, getUser,loginUser,updateUser } from "./controller/usercontroller.js";
import { createStudent, getStudent, updateStudent ,deleteStudent} from "./controller/studentdatacontroller.js";
const app = express();

app.use(express.json());
const router = express.Router();
await createConnection();
router.post("/api/createUser", createUser);
router.get("/api/getUser", getUser);
router.put("/api/updateUser", updateUser);
router.delete("/api/deleteUser/:id", deleteUser);
 router.post("/api/Userlogin", loginUser);
// router.post("/api/signupUser", signupUser);

// Sudentdata Api
router.post("/api/createstudent", createStudent);
router.get("/api/getstudent", getStudent);
router.put("/api/updatestudent/:id", updateStudent);
router.delete("/api/deletestudent/:id", deleteStudent);
 //router.post("/api/Userlogin", loginUser);

// app.use(cors({
//   origin: "http://127.0.0.1:3002", // Allow requests from this origin
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true // Allow specific HTTP methods
// }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3003');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true'); // Include credentials if needed
  next();
});

app.use(router);
app.listen(3002, () => {
  console.log(`Server is running on http://localhost:3002`);
});