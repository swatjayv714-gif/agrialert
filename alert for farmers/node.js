// services/weatherService.js
import axios from "axios";

const API_KEY = process.env.WEATHER_API_KEY;

export async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
}
import cron from "node-cron";
import { getWeather } from "./services/weatherService.js";

cron.schedule("*/30 * * * *", async () => {
  const data = await getWeather(-1.2921, 36.8219); // example farm location
  console.log("Weather updated", data.main.temp);
});
if (weather.main.temp > 35) {
  sendAlert("Heat stress warning");
}
