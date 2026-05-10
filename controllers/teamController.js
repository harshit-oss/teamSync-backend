const Project = require("../models/Project");
const User = require("../models/User");

const inviteMember = async (req, res) => {

  try {

    const { email, projectId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    const project = await Project.findById(projectId);

    project.members.push(user._id);

    await project.save();

    res.json({
      message: "Member added successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  inviteMember,
};