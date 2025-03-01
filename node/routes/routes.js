import express from "express";
const router = express.Router();
import controller from "../controller/controller.js";
router.post("/Login", controller.Login);
router.post("/Register", controller.Register);
router.post("/GetCode", controller.getcode);
router.post("/reset-password", controller.resetpassword);
export default router;
