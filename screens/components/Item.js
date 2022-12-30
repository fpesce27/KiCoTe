import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Item = (props) => {

    const { item, index } = props;
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.item} key={index} onPress={() => navigation.navigate('Item', { item })}>
            <Image
                style={styles.itemImage}
                source={require('../../assets/icon.png')}
            />
            <View style={styles.itemText}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Item

const styles = StyleSheet.create({
    item: {
        width: '48%',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    itemText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 18,
        color: '#007aff',
    },
    itemImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
})