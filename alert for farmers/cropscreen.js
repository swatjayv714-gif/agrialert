import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TextInput, Alert } from "react-native";
import api from "../api/api";

export default function CropScreen({ navigation }) {
    const [crops, setCrops] = useState([]);
    const [cropName, setCropName] = useState("");
    const [minRainfall, setMinRainfall] = useState("");
    const [maxTemp, setMaxTemp] = useState("");

    const fetchCrops = async () => {
        const res = await api.get("/crops");
        setCrops(res.data);
    };

    const addCrop = async () => {
        try {
            await api.post("/crops", { cropName, minRainfall, maxTemp });
            setCropName(""); setMinRainfall(""); setMaxTemp("");
            fetchCrops();
        } catch (err) {
            Alert.alert("Error", err.response?.data?.error || err.message);
        }
    };

    useEffect(() => { fetchCrops(); }, []);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput placeholder="Crop Name" value={cropName} onChangeText={setCropName} style={{ borderWidth: 1, marginBottom: 5, padding: 8 }} />
            <TextInput placeholder="Min Rainfall (mm)" value={minRainfall} onChangeText={setMinRainfall} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 5, padding: 8 }} />
            <TextInput placeholder="Max Temp (°C)" value={maxTemp} onChangeText={setMaxTemp} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 5, padding: 8 }} />
            <Button title="Add Crop" onPress={addCrop} />
            <FlatList
                data={crops}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <Text style={{ marginTop: 5 }}>{item.cropName} | Min Rain: {item.minRainfall} | Max Temp: {item.maxTemp}</Text>}
            />
            <Button title="View Weather" onPress={() => navigation.navigate("Weather")} />
            <Button title="View Alerts" onPress={() => navigation.navigate("Alerts")} />
        </View>
    );
}
