const express = require("express");

const {
  createTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.delete("/:id", protect, deleteTask);

router.put("/:id", protect, updateTaskStatus);

module.exports = router;