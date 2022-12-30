import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db, auth } from '../../../db/firebase'
import Summary from './Summary';
import Item from './Item';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const clearCart = () => {
    db.collection('users').doc(auth.currentUser.uid).collection('cart').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(doc.id).delete();
      })
    })
  }

  React.useEffect(() => {
    const unsubscribe = db.collection('users').doc(auth.currentUser.uid).collection('cart').onSnapshot((snapshot) => {
      setCartItems(snapshot.docs.map((doc) => ({
        id: doc.id,
        cartItem: doc.data()
      })))
    })

    return unsubscribe;
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.titleText}>Cart</Text>
        </View>
        {cartItems.map(({id, cartItem}) => (
          <Item key={id} id={id} cartItem={cartItem}/>
        ))}
        
      </ScrollView>
      <Summary items={cartItems} clearCart={clearCart}/>
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
