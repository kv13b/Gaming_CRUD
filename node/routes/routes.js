import express from "express";
const router = express.Router();
import controller from "../controller/controller.js";
router.post("/create-user", controller.createuser);
router.get("/get-user", controller.getuser);
router.post("/login", controller.login);
export default router;
