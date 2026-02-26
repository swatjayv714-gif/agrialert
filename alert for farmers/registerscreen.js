import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import api from "../api/api";

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            await api.post("/auth/register", { name, phone, location, password });
            Alert.alert("Success", "User registered");
            navigation.goBack();
        } catch (err) {
            Alert.alert("Error", err.response?.data?.error || err.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
            <Button title="Register" onPress={register} />
        </View>
    );
}
