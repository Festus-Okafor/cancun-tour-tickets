
import express from "express";
const router = express.Router();

import {registerUser, loginUser, getUser, updateUser, deleteUser} from "../controller/userController.js"; 


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getUser);
router.post("/update:id", updateUser);
router.post("/delete:id", deleteUser);

export default router;
