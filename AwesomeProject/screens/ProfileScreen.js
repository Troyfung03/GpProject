import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button } from "@rneui/base";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../navigation/context";
export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const getUsername = async () => {
      let username;
      try {
        username = await SecureStore.getItemAsync("username");
        setUsername(username);
      } catch (e) {
        console.log("error:", e);
      }
    };
    getUsername();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hi {username}, Welcome to your profile</Text>
      <Button
        title="Logout"
        buttonStyle={styles.logoutButton}
        titleStyle={styles.logoutButtonText}
        onPress={() => signOut()}
      />
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});