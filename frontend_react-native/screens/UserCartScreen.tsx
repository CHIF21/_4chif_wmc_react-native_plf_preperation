import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { IUser } from "../interfaces/IUser";
import ShopDBService from "../services/ShopDBService";

interface UserCartScreenProps {
    route: any;
}

const UserCartScreen = ({ route }: UserCartScreenProps) => {
    const { userId } = route.params;
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        ShopDBService.getUserById(userId)
            .then(setUser)
            .catch(console.error);
    }, [userId]);

    if (!user) {
        return <Text>Lade Benutzer...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Warenkorb von {user.firstname} {user.lastname}
            </Text>
            <FlatList
                data={user.products}
                keyExtractor={(item) => item.product._id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.product.name}</Text>
                        <Text>Menge: {item.amount}</Text>
                        <Text>Preis: {item.product.price} €</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default UserCartScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, marginBottom: 10 },
    item: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10,
    },
});
