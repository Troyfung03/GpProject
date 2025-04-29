import { createContext, useMemo } from "react";
import * as SecureStore from "expo-secure-store";
import { apiLogin, apiRegister } from "../services/api";
 
export const AuthContext = createContext();
 
export const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case "RETRIVE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        username: action.username,
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...prevState,
        userToken: action.token,
        username: action.username,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...prevState,
        userToken: null,
        username: null,
        isLoading: false,
      };
  }
};
 
export const authenticationController = (dispatch) => ({
  signIn: async ({ username, password }) => {
    try {
      const response = await apiLogin({ username, password });
      if (response.error) {
        return response.error;
      } else {
        const { token, username } = response;
        await SecureStore.setItemAsync("userToken", token);
        await SecureStore.setItemAsync("username", username);
        dispatch({ type: "LOGIN", token: token, username: username });
      }
    } catch (error) {
      console.log("error in SignIn: ", error);
      dispatch({ type: "LOGOUT" });
    }
 
  },
  signOut: async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
    } catch (error) {
      console.log("error", error);
    }
    dispatch({ type: "LOGOUT" });
  },
  signUp: async (data) => {
    try {
      const { created } = await apiRegister(data);
      return { created }
    } catch (error) {
      console.log("error in SignIn: ", error);
      dispatch({ type: "LOGOUT" });
    }
  },
});
