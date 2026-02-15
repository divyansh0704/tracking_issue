const Ticket = require("../models/Ticket");

exports.getStats = async (req, res) => {
  try {
    // Only admin should access this
    const totalTickets = await Ticket.countDocuments();

    const open = await Ticket.countDocuments({ status: "open" });
    const inProgress = await Ticket.countDocuments({ status: "in-progress" });
    const closed = await Ticket.countDocuments({ status: "closed" });

    const highPriority = await Ticket.countDocuments({ priority: "high" });
    const mediumPriority = await Ticket.countDocuments({ priority: "medium" });
    const lowPriority = await Ticket.countDocuments({ priority: "low" });

    res.json({
      totalTickets,
      open,
      inProgress,
      closed,
      highPriority,
      mediumPriority,
      lowPriority
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
