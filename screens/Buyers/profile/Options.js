import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { UserCircleIcon, WalletIcon } from 'react-native-heroicons/outline'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { auth, db } from '../../../db/firebase';

const Options = () => {
    
    const navigation = useNavigation();
    const theme = useTheme()
    const [role, setRole] = React.useState('')

    React.useEffect(() => {
        db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
            setRole(doc.data().role)
        })
    }, [])
    
    return (
        <>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ProfileScreen")}>
                <Text style={{fontSize:20, color: theme.colors.secondary}}> <UserCircleIcon style={{...styles.optionIcon, color:theme.colors.secondary}} /> Editar Perfil </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("OrdersHistory")}>
                <Text style={{fontSize:20, color: theme.colors.secondary}}> <WalletIcon style={{...styles.optionIcon, color:theme.colors.secondary}} /> Historial de Pedidos </Text>
            </TouchableOpacity>

            {role === 'sellers' &&
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("SchoolAdjustments")}>
                    <Text style={{fontSize:20, color: theme.colors.secondary}}> <WalletIcon style={{...styles.optionIcon, color:theme.colors.secondary}} /> Ajustes del Colegio </Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default Options

const styles = StyleSheet.create({
    option: {
        padding: 20,
        marginVertical: 5,
        borderRadius: 50,
        margin: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#fff',
    },
    optionIcon: {
        marginRight: 10,
    },
})