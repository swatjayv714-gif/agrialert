// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const JWT_SECRET = "secret123"; // Change to strong secret in production

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(bodyParser.json());

// --------------------
// MongoDB connection
// --------------------
mongoose.connect("mongodb://127.0.0.1:27017/agrialert", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// --------------------
// Models
// --------------------
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    location: String,
    password: String
});
const User = mongoose.model("User", userSchema);

const cropSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cropName: String,
    minRainfall: Number,
    maxTemp: Number
});
const Crop = mongoose.model("Crop", cropSchema);

const alertSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Alert = mongoose.model("Alert", alertSchema);

// --------------------
// Auth Middleware
// --------------------
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}

// --------------------
// Routes
// --------------------

// Register
app.post("/api/auth/register", async (req, res) => {
    const { name, phone, location, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, phone, location, password: hashed });
    await user.save();
    res.json({ message: "User registered" });
});

// Login
app.post("/api/auth/login", async (req, res) => {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
});

// --------------------
// Crops
// --------------------
app.get("/api/crops", authMiddleware, async (req, res) => {
    const crops = await Crop.find({ farmer: req.user.id });
    res.json(crops);
});

app.post("/api/crops", authMiddleware, async (req, res) => {
    const { cropName, minRainfall, maxTemp } = req.body;
    const crop = new Crop({
        farmer: req.user.id,
        cropName,
        minRainfall,
        maxTemp
    });
    await crop.save();
    res.json(crop);
});

// --------------------
// Weather (mock)
// --------------------
app.get("/api/weather/:location", authMiddleware, async (req, res) => {
    const { location } = req.params;
    // Mocked data for simplicity, replace with real API
    res.json({
        location,
        temperature: Math.floor(Math.random() * 35),
        rainfall: Math.floor(Math.random() * 200),
        condition: "Sunny"
    });
});

// --------------------
// Alerts
// --------------------
app.get("/api/alerts", authMiddleware, async (req, res) => {
    const alerts = await Alert.find({ farmer: req.user.id }).sort({ date: -1 });
    res.json(alerts);
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
