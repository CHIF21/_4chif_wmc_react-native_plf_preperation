import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListScreen from "../screens/UserListScreen";
import UserCreateScreen from "../screens/UserCreateScreen";
import UserCartScreen from "../screens/UserCartScreen";

const Stack = createNativeStackNavigator();

const UserStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="UserList" component={UserListScreen} />
        <Stack.Screen name="UserCreate" component={UserCreateScreen} />
        <Stack.Screen name="UserCart" component={UserCartScreen} />
    </Stack.Navigator>
);

export default UserStack;
