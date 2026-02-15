const express = require("express");
const { register,login } = require("../controllers/Authcontroller");
const { protect, authorizeRoles } = require("../middleware/Authmiddleware");
const router = express.Router();
// router.get("/test", protect, (req, res) => {
//   res.json({ message: "Protected route accessed", user: req.user });
// });
// router.get(
//   "/user",
//   protect,
//   authorizeRoles("user"),
//   (req, res) => {
//     res.json({ message: "Welcome user" });
//   }
// );




router.post("/register", register);
router.post("/login", login);

module.exports = router;

