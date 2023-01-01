import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

const Item = (props) => {

    const { item } = props;
    const navigation = useNavigation();
    const theme = useTheme();


    return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Item', {item: item})}>
                <Image
                    style={styles.itemImage}
                    source={require('../../assets/icon.png')}
                />
                <View style={styles.itemText}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={{...styles.itemPrice, color:theme.colors.primary}}>${item.price}</Text>
                </View>
            </TouchableOpacity>
    )
}

export default Item

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
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
        backgroundColor: '#fff',
        borderRadius: 100,
    },
})