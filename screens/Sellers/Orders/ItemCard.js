import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'

const ItemCard = (props) => {

    const [completed, setCompleted] = React.useState(false)
    const theme = useTheme()
  
    return (
    <TouchableOpacity style={completed ? [styles.container, {backgroundColor:'lightgreen'}] : {...styles.container, backgroundColor:theme.colors.primary}} onPress={() => setCompleted(!completed)}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri:props.item.cartItem.image}} />
            <Text style={styles.text}>{props.item.cartItem.name}</Text>
        </View>
        <Text style={styles.text}>{props.item.cartItem.amount}</Text>
        <Text style={styles.text}>
            ${props.item.cartItem.price * props.item.cartItem.amount}
        </Text>
    </TouchableOpacity>
  )
}

export default ItemCard

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 24,
        width: '95%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    text: {
        fontSize: 18,
        marginLeft: 10,
    },
})