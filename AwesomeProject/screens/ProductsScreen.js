import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import ProductItem from '../components/ProductItem';
import { getProducts } from '../services/api';
export default function ProductsScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [productsList, setProductsList] = useState([]);
    // item pressed handler, send product data to OrderScreen
    const pressHandler = (product) => {
        navigation.navigate('Order', {
            product: product
        })
    }
            // function to call api then update the product data
    async function fetchProducts() {
            setIsLoading(true);
            console.log("fetching product list from server ...");
            const products = await getProducts();
            setProductsList(products);
            setIsLoading(false);
    }
    // useEffect hook run immediately when the screen loaded
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Available Products</Text>
            {productsList.length > 0 ?
                <FlatList
                    data={productsList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.productContainer}>
                            <ProductItem
                                item={item}
                                pressHandler={pressHandler}
                            />
                        </View>
                    )}
                    refreshing={isLoading}
                    onRefresh={() => fetchProducts()}
                /> :
                <View style={styles.emptyView}>
                    <Text>No Products</Text>
                    <Button title="Refresh" onPress={() => fetchProducts()} />
                </View>
            }
        </View>
    )
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
    productContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
});