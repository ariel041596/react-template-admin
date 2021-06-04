import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";

// @desc Add task
// @route POST /api/tasks
// @access Private
const addTask = asyncHandler(async (req, res) => {
  const { task, start, end } = req.body;
  if (!task) {
    res.status(400);
    throw new Error("No task added");
    return;
  } else {
    const newTask = new Task({
      task,
      start,
      end,
      user: req.user._id,
    });
    const createdTask = await newTask.save();
    res.status(201).json(createdTask);
  }
});

// @desc GET all task of Certain User
// @route GET /api/tasks/mytasks
// @access Private
const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    user: req.user._id,
  });
  res.json(tasks);
});

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    // you can also call if the certain user who create the user can
    // delete the user
    // by checking
    // if(req.user._id == user.user._id)
    await task.remove();
    res.json({
      message: "Successfully deleted task",
    });
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

export { addTask, getMyTasks, deleteTask };
