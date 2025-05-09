import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
export default function OrderItem({
    product,
    quantity,
    totalAmount,
    inputHandler,
    deliveryDate,
    setDeliveryDate,
    customerAddress,
    setCustomerAddress,
}) {
    const defaultImage = "https://reactnative.dev/img/tiny_logo.png";
    // calculate the discount
    const discountText = ((1 - product.discount) * 100).toFixed(2);
    const [mode, setMode] = useState("date")
    const [showDatetimePicker, setShowDatetimePicker] = useState(false)
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || deliveryDate;
        setShowDatetimePicker(Platform.OS === "ios");
        console.log(currentDate);
        setDeliveryDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShowDatetimePicker(true)
        setMode(currentMode)
    }
    const showDatepicker = () => {
        showMode('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };
    return (
        // Main container
        <View style={styles.container}>
            {/* display the product image */}
            <Image
                style={styles.logo}
                source={{
                    uri:
                        product.picture == null || product.picture == ""
                            ? defaultImage
                            : product.picture,
                }}
            />
            {/* display the product info */}
            <View style={styles.header}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.priceText}>${product.price}</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.text}>{product.description}</Text>
                <Text style={styles.text}>In stock: {product.quantity}</Text>
                {product.discount < 1 ? (
                    <Text style={styles.text}>
                        Discount:{" "}
                        <Text style={styles.discountText}>
                           {((1-product.discount) * 100).toFixed(2)}% OFF
                        </Text>
                    </Text>
                ) : null}
            </View>
            {/* User quantity input field */}
            <Text style={styles.label}>Quantity:</Text>
            <TextInput
                style={styles.textInput}
                value={quantity}
                onChangeText={inputHandler}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Customer Address:</Text>
            <TextInput
                style={styles.textInput}
                value={customerAddress}
                onChangeText={setCustomerAddress}
                placeholder="Enter your address"
            />
            <Text style={styles.label}>
                Delivery Date: {deliveryDate.toLocaleString()}
            </Text>
            <View style={styles.dateTimeRow}>
                <Button onPress={showDatepicker} title="Choose Date" />
                <Button onPress={showTimepicker} title="Choose Time" />
            </View>
            {showDatetimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={deliveryDate}
                    minimumDate={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {/* display total amount */}
            <Text style={styles.amountText}>Total: ${totalAmount}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    priceText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    logo: {
        resizeMode: "contain",
        height: 80,
        width: 80,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    infoBox: {
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#555",
    },
    discountText: {
        fontSize: 16,
        color: "red",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 5,
        color: "#333",
    },
    amountText: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "flex-end",
    },
    textInput: {
        width: "100%",
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
    },
    dateTimeRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 10,
    },
});