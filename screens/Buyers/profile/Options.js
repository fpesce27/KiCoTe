import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { UserCircleIcon, WalletIcon } from 'react-native-heroicons/outline'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

const Options = () => {
    
    const navigation = useNavigation();
    const theme = useTheme()
    
    return (
        <>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ProfileScreen")}>
                <Text style={styles.optionText}> <UserCircleIcon style={{...styles.optionIcon, color:theme.colors.accent}} /> Editar Perfil </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("OrdersHistory")}>
                <Text style={styles.optionText}> <WalletIcon style={{...styles.optionIcon, color:theme.colors.accent}} /> Historial de Pedidos </Text>
            </TouchableOpacity>
        </>
    )
}

export default Options

const styles = StyleSheet.create({
    profileOptions: {
        padding: 20,
    },
    option: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    optionText: {
        fontSize: 20,
        fontWeight: 'normal',
    },
    optionIcon: {
        marginRight: 10,
    },
})