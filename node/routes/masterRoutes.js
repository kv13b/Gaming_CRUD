import express from "express"; //keeping the master routes together
const router = express.Router();
import masterController from "../controller/masterController.js";
router.post("/client", masterController.Clientinsert);
export default router;
