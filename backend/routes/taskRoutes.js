import express from "express";
const router = express.Router();
import {
  addTask,
  getMyTasks,
  deleteTask,
} from "../controllers/taskController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addTask);
router.route("/mytasks").get(protect, getMyTasks);
router.route("/:id").delete(protect, deleteTask);

export default router;
