const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { name, phone, location, password } = req.body;
        const user = new User({ name, phone, location, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user: { id: user._id, name: user.name } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.saveToken = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.fcmToken = token;
        await user.save();
        res.json({ message: "Token saved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
