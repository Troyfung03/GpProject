import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';

import ProductsScreen from "../screens/ProductsScreen";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TransactionsScreen from "../screens/TransactionsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProductNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Products"
                component={ProductsScreen}
                opttions={{ headerShown: false }}
            />
            <Stack.Screen
                name="Order"
                component={OrderScreen}
                initialParams={{ product: undefined }}
            />
        </Stack.Navigator>
    );
}

function TransactionsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Transactions"
                component={TransactionsScreen}
                options={{ headerShown: true, title: "Transactions" }}
            />
        </Stack.Navigator>
    );
}

function ProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: true, title: "Profile" }}
            />
        </Stack.Navigator>
    );
}

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Product Tab"
                component={ProductNavigator}
                options={{
                    tabBarLabel: "Products",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={size} />

                    ),
                }}
            />

            <Tab.Screen
                name="TransactionsTab"
                component={TransactionsNavigator}
                options={{
                    tabBarLabel: "Transactions",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="credit-card-outline" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile Tab"
                component={ProfileNavigator}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}





