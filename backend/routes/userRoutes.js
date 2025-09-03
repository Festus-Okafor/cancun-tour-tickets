
import express from "express";
const router = express.Router();

import {registerUser, loginUser, getUser, updateUser, deleteUser} from "../controller/userController.js"; 


router.post("/", registerUser);
router.post("/", loginUser);
router.get("/", getUser);
router.post("/", updateUser);
router.post("/", deleteUser);

export default router;
