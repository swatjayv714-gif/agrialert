import React from "react";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
    return <AppNavigator />;
}
import React, { useEffect } from "react";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
    useEffect(() => {
        // Request permissions on iOS
        messaging().requestPermission();

        // Get device token for backend
        messaging().getToken().then(token => {
            console.log("FCM Token:", token);
            // Send this token to backend to associate with user
        });

        // Handle foreground messages
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert("New Alert", remoteMessage.notification.body);
        });

        return unsubscribe;
    }, []);

    return <AppNavigator />;
}
messaging().onMessage(async remoteMessage => {
    Alert.alert("New Alert", remoteMessage.notification.body);
});
