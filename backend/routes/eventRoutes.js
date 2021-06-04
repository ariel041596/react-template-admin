import express from "express";
const router = express.Router();
import { addEvent, getEvents } from "../controllers/eventController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addEvent).get(protect, isAdmin, getEvents);

export default router;
