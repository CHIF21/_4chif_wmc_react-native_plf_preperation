import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ShopDBService from "../services/ShopDBService";
import {IProduct} from "../interfaces/IProduct";

interface IProductDetailScreen {
    route: any;
}

const ProductDetailScreen = ({ route } : IProductDetailScreen) => {
    const { productNr } = route.params;
    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        ShopDBService.getProductByNr(productNr).then(setProduct).catch(console.error);
    }, []);

    if (!product) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{product.name}</Text>
            <Text>Preis: {product.price}€</Text>
            <Text>Kategorie: {product.category}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    name: { fontSize: 24, fontWeight: "bold", marginBottom: 10 }
});

export default ProductDetailScreen;
