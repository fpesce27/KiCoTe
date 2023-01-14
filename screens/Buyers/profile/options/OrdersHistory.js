import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { db, auth } from '../../../../db/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '../../../components/Controls'
import Order from './Order'
import { useTheme } from 'react-native-paper'
import Background from '../../../components/Background'

const OrdersHistory = () => {
    
    const [orders, setOrders] = React.useState([])
    const theme = useTheme()

    React.useEffect(() => {
        db.collection('users').doc(auth.currentUser.uid).collection('orders').orderBy('date', 'desc').onSnapshot((snapshot) => {
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                order: doc.data()
            })))
        })
    }, [])

    return (
        <Background>
    <SafeAreaView>
        <BackButton/>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Historial de Pedidos</Text>
        </View>
        <FlatList
            data={orders}
            renderItem={({item}) => <Order id={item.id} order={item.order}/>}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingBottom: 300}}
        />
    </SafeAreaView>
    </Background>
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
        fontSize: 35,
        fontWeight: 'bold',
    }, 
})
