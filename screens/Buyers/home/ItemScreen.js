import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ShoppingCartIcon } from 'react-native-heroicons/outline';
import { PlusIcon, MinusIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controls } from '../../components/Controls';
import { db, auth } from '../../../db/firebase';
import { useTheme } from 'react-native-paper';
import InteractionButton from '../../components/InteractionButton';

function handleAddToCart(item, amount, navigation) {

    let founded = false;

    db.collection('Users').doc(auth.currentUser.uid).collection('Cart').where('id', '==', item.id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            founded = true;
            db.collection('Users').doc(auth.currentUser.uid).collection('Cart').doc(doc.id).update({
                amount: doc.data().amount + amount
            })
        })
    }).then(() => {
        if (!founded) {
            db.collection('Users').doc(auth.currentUser.uid).collection('Cart').add({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                amount: amount
            })
        }
    })

    navigation.navigate("Home")
}

function Item({ route }) {
    const { item } = route.params;
    const [amount, setAmount] = useState(1);
    const navigation = useNavigation();
    const theme = useTheme()

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: theme.colors.secondary, }}>
            <Controls item={item} />

            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>

            <View style={styles.textContainer}>

                <View style={styles.nameAndPriceContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={{ fontSize: 25, color: theme.colors.accent }}>${item.price}</Text>
                </View>

                <View style={styles.descriptionContainer}>
                    <ScrollView style={{height: 55}}>
                        <Text style={styles.description}>
                            lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Text>
                    </ScrollView>
                </View>

                <View style={styles.amountAndTotal}>
                    <View>
                        <ManageAmount setAmount={setAmount} amount={amount}/>
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.text}>Total: ${(item.price * amount).toFixed(2)}</Text>
                    </View>
                </View>

                <InteractionButton text="Agregar al Carrito" onPress={() => handleAddToCart(item, amount, navigation)} />
                
            </View>
        </SafeAreaView>
    )
}

export default Item

export const ManageAmount = (props) => {
    const theme = useTheme()

    const handleIncreaseAmount = () => {
        props.setAmount(props.amount + 1)
        props.updateAmount
    }

    const handleDecreaseAmount = () => {
        props.setAmount(Math.max(props.amount - 1, 1))
        props.updateAmount
    }

    return (
        <View style={styles.amountContainer}>
            <TouchableOpacity style={{...styles.amountIcon, backgroundColor:theme.colors.secondary}} onPress={() => handleDecreaseAmount()}>
                <MinusIcon style={{ color: theme.colors.accent }} />
            </TouchableOpacity>
            <View style={{width:'100%', alignItems:'center', marginHorizontal:10}}>
                <Text style={styles.text}>{props.amount}</Text>
            </View>
            <TouchableOpacity style={{...styles.amountIcon, backgroundColor:theme.colors.accent}} onPress={() => handleIncreaseAmount()}>
                <PlusIcon style={{ color: theme.colors.primary }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: Platform.OS === 'ios' ? '50%' : '45%',
        zIndex: -1,
        marginTop: -70,
    },
    textContainer: {
        height: Platform.OS === 'ios' ? '50%' : '60%',
        backgroundColor: 'white',
        borderRadius: 60,
    },
    nameAndPriceContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    description: {
        fontSize: 15,
        color: 'gray',
    },
    amountAndTotal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    amountContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '30%',
    },
    amountIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    totalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

