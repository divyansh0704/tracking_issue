const express = require("express");
const { getStats } = require("../controllers/Dashboardcontroller");
const { protect, authorizeRoles } = require("../middleware/Authmiddleware");

const router = express.Router();


router.get("/stats", protect, authorizeRoles("admin"), getStats);

module.exports = router;
