import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { db } from '../../../db/firebase'
import { useNavigation } from '@react-navigation/native'

const Order = (props) => {
    
    const [image, setImage] = React.useState(null)
    const [name, setName] = React.useState(null)
    const navigation = useNavigation()

    React.useEffect(() => {
        db.collection('Buyers').doc(props.order.userId).get().then((doc) => {
            setImage(doc.data().image)
            setName(doc.data().name)
        })
    }, [])
    
    return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('OrderScreen', {order: props.order, name: name, userId: props.order.userId})}>
        <View style={styles.orderTop}>
            <Text style={styles.orderName}>{name}</Text>
            <Text style={props.order.status === 'Pending' ? styles.orderStatus : props.order.status === 'Cancelled' ? [styles.orderStatus, {color: 'red'}] : [styles.orderStatus, {color: 'green'}]}>{props.order.status}</Text>
        </View>
        
        <View style={styles.orderBottom}>
            <Image style={styles.orderImage} source={{uri: image}} />
            <Text style={styles.orderItems}>Items: {props.order.items.length}</Text>
            <Text style={styles.orderTotal}>${props.order.total}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Order

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    orderTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingBottom: 10,
    },
    orderBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
    },
    orderName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderStatus: {
        fontSize: 16,
        color: 'gray',
    },
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
    },
    orderItems: {
        fontSize: 16,
        color: 'gray',
    },
    orderTotal: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})