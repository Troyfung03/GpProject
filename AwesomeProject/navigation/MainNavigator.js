import React, { useReducer, useMemo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from "./HomeNavigator";
import SplashScreen from "../screens/SplashScreen";
const Stack = createStackNavigator();

export default function MainStackNavigator() {
    const initialLoginState = {
        isLoading: false,
        userToken: "UserToken",
        username: null,
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    initialLoginState.isLoading ? (
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : initialLoginState.userToken == null ? (
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{headerShown:false}}
                        />) : (
                        <Stack.Screen
                            name="Home"
                            component={BottomTabNavigator}
                            options={{headerShown:false}}
                        />
                        )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
