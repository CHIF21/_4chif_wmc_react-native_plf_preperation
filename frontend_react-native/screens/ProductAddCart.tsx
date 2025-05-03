import React, { useEffect, useState } from "react";
import {
    View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity
} from "react-native";
import ShopDBService from "../services/ShopDBService";
import { IUser } from "../interfaces/IUser";

interface Props {
    route: any;
    navigation: any;
}

const ProductAddToCartScreen = ({ route, navigation }: Props) => {
    const { productNr } = route.params;
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [amount, setAmount] = useState("1");

    useEffect(() => {
        ShopDBService.getUsers().then(setUsers).catch(console.error);
    }, []);

    const handleAddToCart = async () => {
        if (!selectedUserId) {
            return;
        }

        try {
            await ShopDBService.addProductToCart(selectedUserId, productNr, parseInt(amount));
            navigation.navigate("ProductList");
        } catch (err) {
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Benutzer wählen:</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.userItem,
                            item._id === selectedUserId && styles.userItemSelected
                        ]}
                        onPress={() => setSelectedUserId(item._id)}
                    >
                        <Text>{item.firstname} {item.lastname}</Text>
                    </TouchableOpacity>
                )}
            />

            <Text style={styles.label}>Menge:</Text>
            <TextInput
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
            />

            <Button title="Zum Warenkorb hinzufügen" onPress={handleAddToCart} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 16, marginVertical: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 20,
    },
    userItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 5,
        borderRadius: 5,
    },
    userItemSelected: {
        backgroundColor: "#d0f0c0",
        borderColor: "#4CAF50",
    }
});

export default ProductAddToCartScreen;
