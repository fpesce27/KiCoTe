import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

const Item = (props) => {

    const { item } = props;
    const navigation = useNavigation();
    const theme = useTheme();
    
    return (
            <TouchableOpacity style={{...styles.itemContainer, backgroundColor:theme.colors.item}} onPress={() => navigation.navigate('Item', {item: item})}>
                <Image
                    style={styles.itemImage}
                    source={{uri:item.image}}
                />
                <View style={styles.itemText}>
                    <Text style={{...styles.itemName, color:theme.colors.text}}>{item.name}</Text>
                    <Text style={{...styles.itemPrice, color:theme.colors.accent}}>${item.price}</Text>
                </View>
            </TouchableOpacity>
    )
}

export default Item

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        borderRadius: 30,
        padding: 10,
        marginBottom: 20,
        display: 'flex',
        height: 260,
        flexDirection: 'column',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 18,
    },
    itemImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
        marginVertical: 25,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
})