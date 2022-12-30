import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { TrashIcon } from 'react-native-heroicons/outline';
import { db, auth } from '../../../db/firebase';

function removeItem(id) {
    db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(id).delete();
}

const Item = (props) => {

    const {id, cartItem} = props;

    return (
        <View key={id} style={styles.cartItem}>
            <View style={styles.cartItemLeft}>
                <Image source={cartItem.image} style={styles.image} />
                <View style={styles.textContainer} className='space-y-3'>
                    <Text style={styles.name}>{cartItem.name}</Text>
                    <Text style={styles.price}>
                        $ {(cartItem.price * cartItem.amount).toFixed(2)}
                    </Text>
                </View>
            </View>
            <View style={styles.cartItemRight}>
                <Text style={styles.quantity}>{cartItem.amount}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => removeItem(id)}>
                <TrashIcon style={styles.buttonText} />
            </TouchableOpacity>
                
        </View>
    )
}

export default Item

const styles = StyleSheet.create({
    cartItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      cartItemLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
      },
      image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#007AFF',
      },
      cartItemRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      quantity: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 15,
        backgroundColor: '#007AFF',
        borderRadius: 10,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
})