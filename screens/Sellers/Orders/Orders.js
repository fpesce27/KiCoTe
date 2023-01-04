import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Order from './Order'
import { db, auth } from '../../../db/firebase'
import { useTheme } from 'react-native-paper'

const Orders = () => {

    const [height, setHeight] = React.useState(0)
    const theme = useTheme()
    const [orders, setOrders] = React.useState([])

    React.useEffect(() => {
        db.collection('Schools').doc(theme.data.schoolId).collection('Users').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                db.collection('Schools').doc(theme.data.schoolId).collection('Users').doc(doc.id).collection('Orders').onSnapshot((snapshot) => {
                    setOrders(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        order: doc.data()
                    })))
                })
            })
        })
    }, [])

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.text}>Orders</Text>
        </View>
        <FlatList
            data={orders}
            renderItem={({ item }) => item.order.status === 'Pending' && (
                <Order order={item} />
            )}
            keyExtractor={item => item.id}
            onContentSizeChange={(contentWidth, contentHeight) => { setHeight(contentHeight) }}
            style={{ padding:20 }}
        />
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
})