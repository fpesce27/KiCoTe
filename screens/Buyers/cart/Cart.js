import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db, auth } from '../../../db/firebase'
import Summary from './Summary';
import Item from './Item';
import InteractionButton from '../../components/InteractionButton';
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
//import { breaks } from '../../constants';
import Background from '../../components/Background';


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const theme = useTheme();
  const [selectedBreak, setSelectedBreak] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [breaks, setBreaks] = useState([]);
  const navigation = useNavigation();

  const handleCheckout = () => {
    if (cartItems.length !== 0) {
      /* db.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
        db.collection('activeOrders').add({
          items: cartItems,
          total: cartItems.reduce((acc, item) => acc + item.cartItem.price * item.cartItem.amount, 0),
          status: 'Pending',
          date: new Date(),
          userId: auth.currentUser.uid,
          break: selectedBreak,
          schoolId: doc.data().schoolId
        })
      })
      .then(() => {
        clearCart();
      }) */
      navigation.navigate('Checkout', { items: cartItems })
  } else {
    alert('No puedes ordenar sin productos')
  }
}

  const clearCart = () => {
    db.collection('users').doc(auth.currentUser.uid).collection('cart').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    })
  }

  React.useEffect(() => {
    db.collection('users').doc(auth.currentUser.uid).collection('cart').onSnapshot((querySnapshot) => {
      setCartItems(querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          cartItem: doc.data()
        }
      }))
    })
    
    db.collection('users').doc(auth.currentUser.uid).get()
    .then((doc) => { return doc.data().schoolId })
    .then((schoolId) => {
      db.collection('schools').doc(schoolId).get().then((doc) => {
        setBreaks(doc.data().breaks)
      })
    })
    
  }, [])

  return (
    <Background>
    <SafeAreaView>

      <View style={styles.title}>
        <Text style={styles.titleText}>Tu Orden</Text>
      </View>

      <View style={{...styles.inputContainer, backgroundColor:theme.colors.white}}>
        <List.Accordion
          title={selectedBreak ? selectedBreak.name : 'Selecciona un horario'}
          titleStyle={{ color: theme.colors.secondary }}
          style={{ borderRadius:23, backgroundColor: selectedBreak ? theme.colors.accent : theme.colors.primary }}
          left={props => <List.Icon {...props} icon="clock" color={selectedBreak ? theme.colors.primary : theme.colors.secondary} />}
          right={props => <List.Icon {...props} icon="chevron-down" color={selectedBreak ? theme.colors.primary : theme.colors.secondary} />}
          expanded={!expanded}
          onPress={() => setExpanded(!expanded)}

        >
          <FlatList
            data={breaks}
            renderItem={({ item }) =>
              <List.Item
                title={item.break.name}
                titleStyle={{ color: theme.colors.accent2 }}
                style={{ backgroundColor: theme.colors.white, margin:10 }}
                onPress={() => { setSelectedBreak(item.break); setExpanded(true) }}
                left={props => <List.Icon {...props} icon="store-clock" color={theme.colors.strongSecondary} />}
                right={() => <Text>{item.break.start.toDate().toLocaleTimeString().slice(0, 5)}</Text>}
              />
            }
            style={{ marginLeft:-70 }}
          />
        </List.Accordion>
      </View>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => <Item key={item.id} id={item.id} cartItem={item.cartItem} />}
        keyExtractor={item => item.id}
        style={{ height:'45%' }}
      />

     
      <Summary items={cartItems} clearCart={clearCart} discount={0} total={cartItems.reduce((acc, item) => acc + item.cartItem.price * item.cartItem.amount, 0)} />
      <InteractionButton text="Confirmar Orden" onPress={handleCheckout} disabled={!selectedBreak} background={selectedBreak ? theme.colors.accent : theme.colors.primary} color={selectedBreak ? theme.colors.primary : theme.colors.secondary} />

    </SafeAreaView>
    </Background>
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
  inputContainer: {
    margin: 15,
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    borderRadius: 24,
    width: '95%',
    marginLeft: 10,
},
})
