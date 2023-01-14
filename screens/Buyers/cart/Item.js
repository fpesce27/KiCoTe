import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { TrashIcon } from 'react-native-heroicons/outline';
import { db, auth } from '../../../db/firebase';
import { ManageAmount } from '../home/ItemScreen';
import { useTheme } from 'react-native-paper';

const Item = (props) => {

  const { id, cartItem } = props;
  const [amount, setAmount] = React.useState(cartItem.amount);
  const theme = useTheme();

  const updateAmount = () => {
    db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(id).update({
      amount: amount
    })
  }

  React.useEffect(() => {
    updateAmount()
  }, [amount])

  React.useEffect(() => {
    setAmount(cartItem.amount)
  }, [cartItem])

  const removeItem = (id) => {
    db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(id).delete()
  }

  return (
    <View key={id} style={styles.cartItem}>

      <View style={styles.imageContainer}>
        <Image source={{ uri: cartItem.image }} style={{width:'100%', height:'100%'}} />
      </View>

      <View style={styles.dataContainer}>
        <Text>{cartItem.name}</Text>
        <Text style={{color:theme.colors.accent}}>${(cartItem.price * amount).toFixed(2)}</Text>
      </View>

      <View style={styles.controls}>

        <ManageAmount item={cartItem} amount={amount} setAmount={setAmount} />

        <TouchableOpacity style={{padding:10}} onPress={() => removeItem(id)}>
          <TrashIcon style={{color:'red'}}/>
        </TouchableOpacity>

      </View>

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
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 35,
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
})