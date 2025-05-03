import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from "react-native";
import {IUser} from "../interfaces/IUser";
import ShopDBService from "../services/ShopDBService";

interface IUserListScreen {
    navigation: any;
}

const UserListScreen = ({ navigation } : IUserListScreen) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        ShopDBService.getUsers().then(setUsers).catch(console.error);
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Neuen Nutzer erstellen" onPress={() => navigation.navigate("UserCreate")} />
            <FlatList
                data={users}
                //@ts-ignore
                keyExtractor={(item : IUser) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("UserCart", { userId: item._id })}
                        style={styles.item}
                    >
                        <Text>{item.firstname} {item.lastname}</Text>
                    </TouchableOpacity>

                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc"
    }
});

export default UserListScreen;
