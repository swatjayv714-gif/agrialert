const Alert = require("../models/Alert");
const Crop = require("../models/Crop");
const weatherApi = require("../utils/weatherApi");
const smsService = require("../utils/smsService");

exports.generateAlerts = async () => {
    try {
        const crops = await Crop.find().populate("farmer");
        for (const crop of crops) {
            const weather = await weatherApi.getWeather(crop.farmer.location);

            let message = null;
            if (weather.rainfall < crop.minRainfall) {
                message = `Drought alert for ${crop.cropName} in ${crop.farmer.location}`;
            } else if (weather.temperature > crop.maxTemp) {
                message = `High temp alert for ${crop.cropName} in ${crop.farmer.location}`;
            }

            if (message) {
                const alert = new Alert({
                    farmer: crop.farmer._id,
                    type: message.includes("Drought") ? "Drought" : "Temperature",
                    message
                });
                await alert.save();

                // Send SMS (optional)
                await smsService.sendSMS(crop.farmer.phone, message);
            }
        }
        console.log("Alerts generated successfully");
    } catch (err) {
        console.log(err);
    }
};

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ farmer: req.user.id }).sort({ date: -1 });
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const admin = require("../utils/firebase");

if (message) {
    const alert = new Alert({
        farmer: crop.farmer._id,
        type: message.includes("Drought") ? "Drought" : "Temperature",
        message
    });
    await alert.save();

    // Send SMS (optional)
    await smsService.sendSMS(crop.farmer.phone, message);

    // Send Push Notification
    if (crop.farmer.fcmToken) {
        await admin.messaging().send({
            token: crop.farmer.fcmToken,
            notification: {
                title: "AgriAlert",
                body: message
            }
        });
    }
}
