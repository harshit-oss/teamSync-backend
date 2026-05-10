const Project = require("../models/Project");

const createProject = async (req, res) => {

  try {

    const { title, description, status } = req.body;

    const newProject = await Project.create({

      title,
      description,
      status,

      createdBy: req.user.id,
    });

    res.status(201).json({

      message: "Project created successfully",

      project: newProject,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",
    });
  }
};

const getProjects = async (req, res) => {

  try {

    const projects = await Project.find()

      .populate("createdBy", "name email")

      .populate("members", "name email");

    res.status(200).json(projects);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",
    });
  }
};

const deleteProject = async (req, res) => {

  try {

    if (req.user.role !== "admin") {

      return res.status(403).json({

        message: "Access denied",
      });
    }

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {

      return res.status(404).json({

        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({

      message: "Project deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",
    });
  }
};

module.exports = {

  createProject,

  getProjects,

  deleteProject,
};