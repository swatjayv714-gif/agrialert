const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: String,
    message: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", AlertSchema);
