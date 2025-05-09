import { useReducer, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import BottomTabNavigator from "./HomeNavigator";
import { AuthContext, AuthReducer, authenticationController } from "./context";
const Stack = createStackNavigator();
export default function MainStackNavigator() {
    const initialLoginState = {
        isLoading: true,
        userToken: null,
        username: null,
    };
    const [state, dispatch] = useReducer(AuthReducer, initialLoginState);
    const authContext = useMemo(() => authenticationController(dispatch), [])
    // Get the token from local secure store if we had logged in before
    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken = null;
            let username = null;
            try {
                userToken = await SecureStore.getItemAsync("userToken");
                username = await SecureStore.getItemAsync("username");
            } catch (e) {
                console.log("error:", e);
            }
            // Dispatch after retrieving the token and username
            dispatch({ type: "RETRIVE_TOKEN", token: userToken, username: username });
        };
        bootstrapAsync();
    }, []);
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.isLoading ? (
                        // We haven't finished checking for the token yet
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : state.userToken == null ? (
                        // No token found, user isn't signed in
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen
                            name="Home"
                            component={BottomTabNavigator}
                            options={{ headerShown: false }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
} 