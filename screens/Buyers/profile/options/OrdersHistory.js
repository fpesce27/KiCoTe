import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { db, auth } from '../../../../db/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '../../../components/Controls'
import Order from './Order'

const OrdersHistory = () => {
    
    const [orders, setOrders] = React.useState([])

    React.useEffect(() => {
        const unsubscribe = db.collection('users').doc(auth.currentUser.uid).collection('orders').orderBy('date', 'desc').onSnapshot((snapshot) => {
            setOrders(snapshot.docs.map((doc) => ({
                id: doc.id,
                order: doc.data()
            })))
        })
        return unsubscribe;
    }, [])

    return (
    <SafeAreaView>
        <BackButton/>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Orders History</Text>
        </View>
        <View style={styles.scroll}>
            <ScrollView >
                {orders.map(({id, order}) => (
                    <Order key={id} id={id} order={order}/>
                ))}
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default OrdersHistory

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 15,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    scroll: {
        height: '100%',
        paddingBottom: 400,
    },
    
})
