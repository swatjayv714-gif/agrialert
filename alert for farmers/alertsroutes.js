const express = require("express");
const router = express.Router();
const { getAlerts } = require("../controllers/alertController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getAlerts);

module.exports = router;
