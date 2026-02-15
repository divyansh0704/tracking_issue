const Ticket = require("../models/Ticket");
const Comment = require("../models/Comments")


exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      createdBy: req.user._id
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const { status, priority } = req.query;

    let filter = {};

    if (req.user.role === "user") {
      filter.createdBy = req.user._id;
    }

    if (req.user.role === "support") {
      filter.$or = [
        { assignedTo: req.user._id },
        { status: "open" }
      ];
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tickets = await Ticket.find(filter)
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role");

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { status, assignedTo, priority } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (assignedTo) ticket.assignedTo = assignedTo;

    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getSingleTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
     const comments = await Comment.find({ ticket: req.params.id })
      .populate("user", "name email role")
      .sort({ createdAt: 1 });

    res.json({ ...ticket.toObject(), comments });

    // res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


