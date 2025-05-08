import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';

import ProductsScreen from "../screens/ProductsScreen";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProductNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Products"
                component={ProductsScreen}
                opttions={{headerShown:false}}
            />
            <Stack.Screen
                name="Order"
                component={OrderScreen}
                initialParams={{product:undefined}}
            />            
        </Stack.Navigator>
    );
}

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator screenOptions={{headerShown:false}}>
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
                name="Profile Tab"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}