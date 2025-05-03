import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import ShopDBService from "../services/ShopDBService";

interface IUserCreateScreen {
    navigation: any;
}

const UserCreateScreen = ({ navigation } : IUserCreateScreen) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const handleSubmit = async () => {
        try {
            await ShopDBService.createUser(firstname, lastname);
            Alert.alert("Erfolgreich", "Benutzer erstellt");
            navigation.goBack();
        } catch (err) {
            Alert.alert("Fehler", "Benutzer konnte nicht erstellt werden");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Vorname"
                value={firstname}
                onChangeText={setFirstname}
                style={styles.input}
            />
            <TextInput
                placeholder="Nachname"
                value={lastname}
                onChangeText={setLastname}
                style={styles.input}
            />
            <Button title="Benutzer erstellen" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10
    }
});


export default UserCreateScreen;