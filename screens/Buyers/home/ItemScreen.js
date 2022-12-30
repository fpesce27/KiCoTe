import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ShoppingCartIcon } from 'react-native-heroicons/outline';
import { Button } from '@rneui/base';
import { PlusIcon, MinusIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controls } from '../../components/Controls';
import { db, auth } from '../../../db/firebase';

function handleAddToCart(item, amount) {

    let founded = false;

    db.collection('users').doc(auth.currentUser.uid).collection('cart').where('id', '==', item.id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            founded = true;
            db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(doc.id).update({
                amount: doc.data().amount + amount
            })
        })
    }).then(() => {
        if (!founded) {
            db.collection('users').doc(auth.currentUser.uid).collection('cart').add({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                amount: amount
            })
        }
    })
}

function Item({ route }) {
    const { item } = route.params;
    const [amount, setAmount] = useState(1);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Controls item={item}/>
            <ScrollView
                contentContainerStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    marginTop: -30,
                }}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
            </ScrollView>
            <View style={styles.addToCartContainer}>
                <View style={styles.amountAndTotal}>
                    <View style={styles.amountContainer}>
                        <TouchableOpacity style={styles.amountIcon} onPress={() => setAmount(Math.max(1, amount - 1))}>
                            <MinusIcon style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.amount}>{amount}</Text>
                        <TouchableOpacity style={styles.amountIcon} onPress={() => setAmount(amount + 1)}>
                            <PlusIcon style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.total}>
                        Total: ${(item.price * amount).toFixed(2)}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleAddToCart(item, amount)
                    navigation.navigate('Home')
                }}>
                    <ShoppingCartIcon style={styles.icon} />
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Item

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    image: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
        backgroundColor: 'red',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        width: '90%',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 25,
        color: '#007AFF',
    },
    addToCartContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    amountAndTotal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        borderRadius: 10,
    },
    amountContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountIcon: {
        width: 30,
        height: 30,
        backgroundColor: '#007AFF',
        borderRadius: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        marginBottom: 40,
        marginHorizontal: 15,
    },
    icon: {
        width: 20,
        height: 20,
        color: 'white',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'white',
    },
})