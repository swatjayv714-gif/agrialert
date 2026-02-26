import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../api/api";

export default function AlertsScreen() {
    const [alerts, setAlerts] = useState([]);

    const fetchAlerts = async () => {
        const res = await api.get("/alerts");
        setAlerts(res.data);
    };

    useEffect(() => { fetchAlerts(); }, []);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={alerts}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <Text style={{ marginBottom: 10 }}>
                        {item.date.split("T")[0]} | {item.type}: {item.message}
                    </Text>
                )}
            />
        </View>
    );
}
