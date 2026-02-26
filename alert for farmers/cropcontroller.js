const Crop = require("../models/Crop");

exports.addCrop = async (req, res) => {
    try {
        const { cropName, minRainfall, maxTemp } = req.body;
        const crop = new Crop({ farmer: req.user.id, cropName, minRainfall, maxTemp });
        await crop.save();
        res.status(201).json(crop);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCrops = async (req, res) => {
    try {
        const crops = await Crop.find({ farmer: req.user.id });
        res.json(crops);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
