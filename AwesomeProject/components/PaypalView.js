import React from "react";
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import { WebView } from "react-native-webview";
import { MaterialIcons } from "@expo/vector-icons";
export default function PaypalView({
    url,
    showModal,
    closeModal,
    paypalHandler,
}) {
    return (
        <Modal animationType="slide" visible={showModal} onRequestClose={closeModal}>
            <View style={styles.modalView}>
                <Pressable onPress={closeModal} >
                    <MaterialIcons name="close" color="black" size={22} />
                </Pressable>
                <View style={styles.webView}>
                    <WebView
                        source={{ uri: url }}
                        onNavigationStateChange={paypalHandler}
                    />
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        flexDirection: "column",
        marginVertical: 50,
        marginHorizontal: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    webView: {
        flex: 1,
        margin: 20,
        borderRadius: 10,
        overflow: "hidden",
    },
});