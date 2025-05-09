import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { Divider } from "@rneui/base";
import { getOrders } from "../services/api";

export default function TransactionsScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [ordersList, setOrdersList] = useState([]);

    // Function to call API and update the product data
    async function fetchOrders() {
        setIsLoading(true);
        console.log("Fetching order list from server...");
        try {
            const transactionList = await getOrders();
            setOrdersList(transactionList);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch orders.");
        } finally {
            setIsLoading(false);
        }
    }

    // useEffect hook runs immediately when the screen loads
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Transaction Records</Text>
            {ordersList.length > 0 ? (
                <FlatList
                    data={ordersList}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={({ item }) => (
                        <View style={styles.transactionCard}>
                            <Text style={styles.transactionText}>Invoice No.: {item.invoice_no}</Text>
                            <Text style={styles.transactionText}>Product: {item.product}</Text>
                            <Text style={styles.transactionText}>Quantity: {item.quantity}</Text>
                            <Text style={styles.transactionText}>Total Amount: HKD ${item.total_amount}</Text>
                            <Text style={styles.transactionText}>Customer Address: {item.customer_address}</Text>
                            <Text style={styles.transactionText}>Delivery On: {item.delivery_date}, {item.delivery_time}</Text>

                        </View>
                    )}
                    refreshing={isLoading}
                    onRefresh={fetchOrders}
                />
            ) : (
                <View style={styles.emptyView}>
                    <Text>No Transactions</Text>
                    <Button title="Refresh" onPress={fetchOrders} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
    },
    emptyView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    topText: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    transactionCard: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    transactionText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#555",
    },
});