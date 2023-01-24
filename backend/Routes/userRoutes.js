const express = require("express");
const {
  registerUser,
  authUser,
  currentUser,
  withdrawBal,
  depositBal,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, currentUser);
router.route("/withdrawBal").put(protect, withdrawBal);
router.route("/depositBal").put(protect, depositBal);
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
