import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db, auth } from '../../../db/firebase'
import Summary from './Summary';
import Item from './Item';
import InteractionButton from '../../components/InteractionButton';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const theme = useTheme()
  const navigation = useNavigation();

  const handleCheckout = () => {
    db.collection('Schools').doc(theme.data.schoolId).collection('Users').doc(auth.currentUser.uid).collection('Orders').add({
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.cartItem.price * item.cartItem.amount, 0),
      status: 'Pending',
      date: new Date(),
      userId: auth.currentUser.uid,
    }).then(() => {
      clearCart();
    })
  }

  const clearCart = () => {
    db.collection('Users').doc(auth.currentUser.uid).collection('Cart').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        db.collection('Users').doc(auth.currentUser.uid).collection('Cart').doc(doc.id).delete();
      })
    })
  }

  React.useEffect(() => {
    const unsubscribe = db.collection('Users').doc(auth.currentUser.uid).collection('Cart').onSnapshot((snapshot) => {
      setCartItems(snapshot.docs.map((doc) => ({
        id: doc.id,
        cartItem: doc.data()
      })))
    })

    return unsubscribe;
  }, [])



  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Text style={styles.titleText}>Tu Orden</Text>
      </View>
      <ScrollView style={{ height:'45%' }}>
        {cartItems.map(({ id, cartItem }) => (
          <Item key={id} id={id} cartItem={cartItem} />
        ))}
      </ScrollView>
      <Summary items={cartItems} clearCart={clearCart} discount={0} total={cartItems.reduce((acc, item) => acc + item.cartItem.price * item.cartItem.amount, 0)} />
      <InteractionButton text="Confirmar Orden" onPress={handleCheckout} />
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 15,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
})
