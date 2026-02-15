const express = require("express");
const {
  addComment,
  getComments
} = require("../controllers/Commentcontroller");

const { protect } = require("../middleware/Authmiddleware");

const router = express.Router();

// Add comment to ticket
router.post("/:ticketId", protect, addComment);

// Get comments for ticket
router.get("/:ticketId", protect, getComments);

module.exports = router;
