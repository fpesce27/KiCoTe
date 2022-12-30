import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { orders } from '../../constants'
import Order from './Order'

const Orders = () => {
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.text}>Orders</Text>
        </View>

        <ScrollView>
            <View style={styles.items}>
                {orders.map((order, index) => (
                    <Order key={index} order={order}/>
                ))}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 15,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    items: {
        padding: 20,
        paddingBottom: 100,
    }
})