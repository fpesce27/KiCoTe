import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const Order = (props) => {
    
    const [showDetails, setShowDetails] = React.useState(false)

    return (
    <View style={styles.order}>
        <View style={styles.orderInfo}>
            <Text style={styles.orderTitle}>{props.order.date}</Text>
            <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                <Text style={styles.orderButtonText}>Details</Text>
            </TouchableOpacity>
        </View>
        {showDetails ? (
            <View style={styles.orderDetails}>
                <View style={styles.orderData}>
                    <Text style={styles.orderText}>Order ID: {props.id}</Text>
                    <Text style={styles.orderText}>Total: ${props.order.total}</Text>
                    <Text style={{...styles.orderText, fontWeight:'bold'}}>Items:</Text>
                </View>
                {props.order.items.map((item) => (
                    <View style={styles.orderItem}>
                        <Image style={styles.orderItemImage} source={item.cartItem.image}/>
                        <Text style={styles.orderItemTitle}>{item.cartItem.name}</Text>
                        <Text style={styles.orderItemAmount}>{item.cartItem.amount}</Text>
                        <Text style={styles.orderItemPrice}>${item.cartItem.price}</Text>
                    </View>
                ))}
            </View>
        ) : null}

        
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
    order: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    orderInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingBottom: 10,
    },
    orderTitle: {
        fontSize: 15,
        fontWeight: '500',
    },
    orderButtonText: {
        color: '#007AFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    orderDetails: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
    },
    orderText: {
        fontSize: 15,
        fontWeight: '500',
        padding: 5,
    },
    orderData: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    orderItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    orderItemImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    orderItemTitle: {
        fontSize: 15,
        fontWeight: '500',
    },
    orderItemAmount: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    orderItemPrice: {
        fontSize: 15,
        fontWeight: 'bold',
    },
})
