const express = require("express");
const {
  checkOrCreateUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/check-or-create", checkOrCreateUser);
router.get("/all", getAllUsers);

module.exports = router;
