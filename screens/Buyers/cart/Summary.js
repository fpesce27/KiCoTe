import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Summary = (props) => {

    const navigation = useNavigation();

    const checkout = () => {
        if (props.items.length > 0) {
            navigation.navigate('Checkout', { items: props.items })
        }
        else {
            alert('Your cart is empty!')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.summaryContainer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.total}>Total</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${
                        props.items.reduce((total, item) => total + (item.cartItem.price * item.cartItem.amount), 0).toFixed(2)
                    }</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={checkout}>
                <Text style={styles.buttonText}>Proceed to checkout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Summary

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    summaryContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
    },
    totalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 15,
        width: '90%',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
