const express = require("express");

const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createProject);

router.get("/", protect, getProjects);
router.delete(
  "/:id",
  protect,
  deleteProject
);

module.exports = router;