const axios = require("axios");

exports.getWeather = async (location) => {
    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data;
    return {
        temperature: data.main.temp,
        rainfall: data.rain?.["1h"] || 0,
        condition: data.weather[0].main
    };
};
