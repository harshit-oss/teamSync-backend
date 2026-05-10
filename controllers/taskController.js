const Task = require("../models/Task");

const createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      status,
      assignedTo,
      dueDate,
      project,
    } = req.body;

    const newTask = await Task.create({

      title,
      description,
      status,
      assignedTo,
      dueDate,
      project,

      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


const getTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("project", "title");

    res.status(200).json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteTask = async (req, res) => {

  try {

    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateTaskStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(

      req.params.id,

      { status },

      { new: true }
    );

    if (!updatedTask) {

      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
};