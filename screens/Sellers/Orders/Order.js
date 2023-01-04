import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { db, auth } from '../../../db/firebase'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'

const Order = (props) => {
    
    const [image, setImage] = React.useState(null)
    const [name, setName] = React.useState(null)
    const navigation = useNavigation()
    const theme = useTheme()

    React.useEffect(() => {
        db.collection('Schools').doc(theme.data.schoolId).collection('Users').doc(props.order.order.userId).get().then((doc) => {
            setName(doc.data().username)
        })
    }, [])
    
    return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('OrderScreen', {order: props.order.order, name: name, userId: props.order.order.userId, orderId:props.order.id})}>
        <View style={styles.orderTop}>
            <Text style={styles.orderName}>{name}</Text>
            <Text style={props.order.order.status === 'Pending' ? styles.orderStatus : props.order.status === 'Cancelled' ? [styles.orderStatus, {color: 'red'}] : [styles.orderStatus, {color: 'green'}]}>{props.order.order.status}</Text>
        </View>
        
        <View style={styles.orderBottom}>
            <Image style={styles.orderImage} source={{uri: image}} />
            <Text style={styles.orderStatus}>Items: {props.order.order.items.length}</Text>
            <Text style={{fontFamily:theme.fonts.regular, fontSize:18}}>${props.order.order.total}</Text>
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
        borderRadius: 35,
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
})