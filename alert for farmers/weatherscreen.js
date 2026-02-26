import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import api from "../api/api";

export default function WeatherScreen() {
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState(null);

    const fetchWeather = async () => {
        try {
            const res = await api.get(`/weather/${location}`);
            setWeather(res.data);
        } catch (err) {
            alert(err.response?.data?.error || err.message);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput placeholder="Enter Location" value={location} onChangeText={setLocation} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
            <Button title="Get Weather" onPress={fetchWeather} />
            {weather && (
                <View style={{ marginTop: 20 }}>
                    <Text>Temperature: {weather.temperature}°C</Text>
                    <Text>Rainfall: {weather.rainfall}mm</Text>
                    <Text>Condition: {weather.condition}</Text>
                </View>
            )}
        </View>
    );
}
