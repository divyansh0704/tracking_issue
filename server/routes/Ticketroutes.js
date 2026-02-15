const express = require("express");
const {
  createTicket,
  getTickets,
  updateTicket,
  getSingleTicket
} = require("../controllers/Ticketcontroller");

const { protect, authorizeRoles } = require("../middleware/Authmiddleware");

const router = express.Router();


router.post("/", protect, authorizeRoles("user", "admin"), createTicket);


router.get("/", protect, getTickets);
router.get("/:id", protect, getSingleTicket);



router.put("/:id", protect, authorizeRoles("admin", "support"), updateTicket);

module.exports = router;
