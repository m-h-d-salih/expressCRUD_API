import express from "express"
import { login, logout, signup } from "./userController.js";

const router=express.Router();

router.post('/register',signup)
router.post('/login',login)
router.post('/logout',logout)

export default router