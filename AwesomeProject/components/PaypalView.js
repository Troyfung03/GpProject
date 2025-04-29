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
    marginLeft: 20
  },
  webView: {
    flex: 1,
    margin: 20,
  },
});
