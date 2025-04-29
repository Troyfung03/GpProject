import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Divider } from '@rneui/base'
import { getOrders } from '../services/api'

export default function TransactionsScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [ordersList, setOrdersList] = useState([]);

    
    // function to call api then update the product data
    async function fetchOrders() {
        setIsLoading(true);
        console.log("fetching transaction list from server ...");
        const transactionsList = await getOrders();
        setOrdersList(transactionsList);
        setIsLoading(false);
    }

    // useEffect hook run immediately when the screen loaded
    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Transaction Records</Text>
            {ordersList.length > 0 ?
                <FlatList
                    data={ordersList}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={<Divider />}
                    renderItem={({item}) => (
                        <View>
                            <Text>Invoice No.: {item.invoice_no}</Text>
                            <Text>Product: {item.product.name}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                            <Text>Total Amount: HKD ${item.total_amount}</Text>
                            <Text>Delivery On: {item.delivery_date}</Text>
                        </View>
                    )}
                    refreshing={isLoading}
                    onRefresh={()=>fetchOrders()}
                /> :
                <View style={styles.emptyView}>
                    <Text>No Transction records</Text>
                    <Button title="Refresh" onPress={() => fetchOrders()} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    topText: {
        marginTop: 30,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    }
})
