import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import ShopDBService from "../services/ShopDBService";
import {IProduct} from "../interfaces/IProduct";

interface IProductListScreen {
    navigation: any
}

const ProductListScreen = ({ navigation } : IProductListScreen) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ShopDBService.getProducts().then(setProducts).catch(console.error);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item : IProduct) => item.productNr.toString()}
                renderItem={({item}  ) => (
                    <TouchableOpacity
                        onLongPress={() => {
                            navigation.navigate("ProductDetail", { productNr: item.productNr });
                        }}
                        onPress={async () => {
                            navigation.navigate("ProductAddCart", { productNr: item.productNr });
                        }}
                        style={styles.item}
                    >
                        <Text>{item.name}</Text>
                        <Text>{item.price}€</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default ProductListScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc"
    }
});
