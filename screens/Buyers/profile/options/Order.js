import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { auth, db } from '../../../../db/firebase'

const Order = (props) => {
    
    const [showDetails, setShowDetails] = React.useState(false)
    const theme = useTheme()
    const [name, setName] = React.useState('')
    const [role, setRole] = React.useState('')
    
    const date = props.order.date.toDate().toLocaleString().split(',')[0]

    React.useEffect(() => {
        db.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
            setRole(doc.data().role)
            if (role == 'sellers') {
                db.collection('users').doc(props.order.userId).get().then((doc) => {
                    setName(doc.data().username)
                })
            }
        })

    }, [])

    return (
    <View style={{...styles.order, backgroundColor: props.order.status === 'Completed' ? theme.colors.secondary : '#ffaaaa'}}>
        <View style={styles.orderInfo}>
            <Text style={styles.orderTitle}>{date}</Text>
            <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                <Text style={{...styles.orderButtonText, color:theme.colors.accent}}>Details</Text>
            </TouchableOpacity>
        </View>
        {showDetails ? (
            <View style={styles.orderDetails}>
                <View style={styles.orderData}>
                    <Text style={{...styles.orderText, color:'black'}}>
                        Order ID: <Text style={{color:theme.colors.accent}}>{props.id}</Text>
                    </Text>
                    {role === 'Sellers' && <Text style={styles.orderText}>Pedido de: <Text style={{color:theme.colors.accent}}>{name}</Text></Text>}
                    <Text style={styles.orderText}>Pedido para: <Text style={{color:theme.colors.accent}}>{props.order.break.name}</Text></Text>
                    <Text style={styles.orderText}>Total: <Text style={{color:theme.colors.accent}}>${props.order.total}</Text></Text>
                    <Text style={{...styles.orderText, fontWeight:'bold'}}>Items:</Text>
                </View>
                {props.order.items.map((item, index) => (
                    <View style={styles.orderItem} key={index}>
                        <Image style={styles.orderItemImage} source={{uri:item.cartItem.image}}/>
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
        margin: 25,
        marginTop: 10,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    orderInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    orderTitle: {
        fontSize: 15,
        fontWeight: '500',
    },
    orderButtonText: {
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
