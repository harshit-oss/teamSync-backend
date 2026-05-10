const express = require("express");

const {
  inviteMember,
} = require("../controllers/teamController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/invite",
  protect,
  inviteMember
);

module.exports = router;