import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductAddToCartScreen from "../screens/ProductAddCart";

const Stack = createNativeStackNavigator();

const ShopStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ProductAddCart" component={ProductAddToCartScreen} />
    </Stack.Navigator>
);

export default ShopStack;
