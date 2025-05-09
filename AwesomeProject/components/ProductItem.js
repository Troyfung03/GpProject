import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

export default function ProductItem({item, pressHandler}) {
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIEphZER953uC49YZx6VPkYeUAk329tcWxnw&s'
  return (
                    <TouchableOpacity
                    style={styles.whitebox}
                    activeOpacity={1}
                    onPress={() => pressHandler(item)}
                >
                    {/* item item image */}
                    <Image
                        style={styles.logo}
                        source={{ uri: item.picture == null || item.picture == "" ? defaultImage : item.picture }}
                    />
        
                    {/* item item info display box*/}
                    <View style={styles.infoBox}>
                        <Text style={styles.title}>{item.name}</Text>
                        <View>
                            <Text>{item.description}</Text>
                            <Text>Qty: {item.quantity}</Text>
                            <Text>Price: ${item.price}</Text>
                            <Text>Last Update: {item.updated}</Text>
                        </View>
                    </View>
        
                    {/* https://icons.expo.fyi/ */}
                    <MaterialIcons
                        name="add-shopping-cart"
                        size={32}
                        color="skyblue"
                        style={styles.rightIcon}
                    />
                </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    whitebox: {
        flex: 1,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    infoBox: {
        marginHorizontal: 15,
        flexGrow: 1,
    },
    rightIcon: {
        alignSelf: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
});

