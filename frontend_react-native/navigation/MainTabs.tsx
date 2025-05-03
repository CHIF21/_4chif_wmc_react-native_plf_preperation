import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopStack from "./ShopStack";
import UserStack from "./UserStack";

const Tab = createBottomTabNavigator();

const MainTabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="Shop" component={ShopStack} />
        <Tab.Screen name="Users" component={UserStack} />
    </Tab.Navigator>
);

export default MainTabs;
