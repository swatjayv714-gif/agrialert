import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export default function LoginScreen({ navigation }) {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const res = await api.post("/auth/login", { phone, password });
            await AsyncStorage.setItem("token", res.data.token);
            navigation.replace("Crops");
        } catch (err) {
            Alert.alert("Login Failed", err.response?.data?.error || err.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
            <Button title="Login" onPress={login} />
            <Text style={{ marginTop: 10 }} onPress={() => navigation.navigate("Register")}>Register</Text>
        </View>
    );
}
