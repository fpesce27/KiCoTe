import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { db, auth } from '../../../db/firebase';

const Summary = (props) => {
    const theme = useTheme()
    const [total, setTotal] = React.useState(props.total)

    React.useCallback(() => {
        let total = 0;
        props.items.forEach(item => {
            total += item.cartItems.price * item.cartItems.amount
        });
        setTotal(total)
    }, [props.total])

    return (
        <View style={styles.container}>
            <View style={styles.itemsTotal}>
                <Text style={{color:'gray'}}>Items ({props.items.length})</Text>
                <Text style={{color:'gray'}}>${props.total.toFixed(2)}</Text>
            </View>
            <View style={styles.itemsTotal}>
                <Text style={{color:'gray'}}>Descuento</Text>
                <Text style={{color:'gray'}}>${props.discount}</Text>
            </View>
            <View style={{...styles.itemsTotal, borderTopWidth: 1, borderTopColor: '#000'}}>
                <Text style={{fontFamily:theme.fonts.regular, fontSize:20}}>Total</Text>
                <Text style={{fontFamily:theme.fonts.regular, fontSize:20, color:theme.colors.primary}}>${(props.total - props.discount).toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default Summary

const styles = StyleSheet.create({
    container: {
    display: 'flex',
    flexDirection: 'column',
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
    itemsTotal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
    }
})
