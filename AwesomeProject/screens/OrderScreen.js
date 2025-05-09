import React, { useState, useEffect} from "react";
import {
    Alert,
    Image,
    RefreshControl,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import OrderItem from "../components/OrderItem";
import PaypalView from "../components/PaypalView";
import { getProduct, makePayment } from "../services/api";
export default function OrderScreen({ route }) {
    const navigation = useNavigation()
    const [product, setProduct] = useState(route.params.product);
    //for user input
    const [isLoading, setIsLoading] = useState(false);
    const [inputQuantity, setInputQuantity] = useState("");
    const [totalAmount, setTotalAmount] = useState("0");
    // for display paypal
    const [showModal, setShowModal] = useState(false);
    const [approvalUrl, setApprovalUrl] = useState("");
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const refreshControl = (
        <RefreshControl
            refreshing={isLoading}
            onRefresh={() => updateProductDate()}
        />
    );
    const inputHandler = (value) => {
        setInputQuantity(value);
        setTotalAmount((value * product.price * product.discount).toFixed(2));
    };
    async function updateProductDate() {
        setIsLoading(true);
        console.log("updateing ProductData from server ...");
        const newProductData = await getProduct(product.id);
        setProduct(newProductData);
        setIsLoading(false);
    }
    async function submitOrder() {
        setIsLoading(true);
        // validate the quantity input
        if (isNaN(inputQuantity) || inputQuantity == "0" || inputQuantity == "") {
            Alert.alert("ERROR", "Please input a valid quantity", [{ text: "Okay" }]);
            setIsLoading(false);
            return;
        }
        console.log("Sending order data to server for making payment");

        const formattedDate = deliveryDate.getFullYear() + "-" + (deliveryDate.getMonth() + 1) + "-" + deliveryDate.getDate();
        const orderData = {
            product: product.id,
            quantity: inputQuantity,
            total_amount: totalAmount,
            delivery_date: formattedDate,
        };
        // using orderData to make payment request to server
        const response = await makePayment(orderData);
        if (response.error) {
            // Show Error Alert about paypal errors
            if (response.error.details) {
                Alert.alert("ERROR", response.error.details[0].issue, [
                    { text: "Okay" },
                ]);
                setIsLoading(false);
                return;
            }
            // Show Error Alert about server error
            Alert.alert("ERROR", response.error, [{ text: "Try again later" }]);
            setIsLoading(false);
            return;
        }
        // get paypal approval url successfully
        if (response.approval_url !== undefined) {
            setApprovalUrl(response.approval_url);
            setShowModal(true);
        }
        setIsLoading(false);
    }
    function closeModal() {
        setShowModal(false);
    }
    function paypalHandler(navState) {
        // Keep track of going back navigation within component
        const { url } = navState;
        if (url.includes('/process/?status=completed')) {
            Alert.alert("Success", "Payment success", [{ text: "Okay" }]);
            closeModal();
        }
        if (url.includes('/cancel/?status=completed')) {
            Alert.alert("Cancelled", "Payment cancelled", [{ text: "Okay" }]);
            closeModal();
        }
    }
    return (
        <View style={styles.container}>
            {/* Paypal modal */}
            <PaypalView
                url={approvalUrl}
                showModal={showModal}
                closeModal={closeModal}
                paypalHandler={paypalHandler}
            />
            {/* ScrollView is the main content view for displaying product detail */}
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={refreshControl}
            >
                <OrderItem
                    product={product}
                    quantity={inputQuantity}
                    totalAmount={totalAmount}
                    deliveryDate={deliveryDate}
                    setDeliveryDate={setDeliveryDate}
                    inputHandler={inputHandler}
                />
            </ScrollView>
            <TouchableOpacity
                style={styles.orderButton}
                onPress={() => {
                    submitOrder();
                }}
            >
                <Text style={styles.buttonText}>PAY by</Text>
                <FontAwesome name="cc-paypal" size={40} color="#3b7bbf" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.cancelButtonText}>Cancel Order</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    orderBox: {
        padding: 15,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    orderButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: "transparent",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007BFF",
        marginRight: 10,
    },
    cancelButton: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FF4C4C",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        backgroundColor: "transparent",
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FF4C4C",

    },
});