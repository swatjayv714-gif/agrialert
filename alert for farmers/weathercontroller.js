const weatherApi = require("../utils/weatherApi");

exports.getWeather = async (req, res) => {
    try {
        const weather = await weatherApi.getWeather(req.params.location);
        res.json(weather);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
