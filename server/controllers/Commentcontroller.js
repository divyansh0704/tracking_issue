const Comment = require("../models/Comments");
const Ticket = require("../models/Ticket");


exports.addComment = async (req, res) => {
  try {
    const { message } = req.body;
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const comment = await Comment.create({
      ticket: ticketId,
      user: req.user._id,
      message
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getComments = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const comments = await Comment.find({ ticket: ticketId })
      .populate("user", "name email role")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
