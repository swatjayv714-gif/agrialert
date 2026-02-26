const express = require("express");
const router = express.Router();
const { addCrop, getCrops } = require("../controllers/cropController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addCrop);
router.get("/", authMiddleware, getCrops);

module.exports = router;
