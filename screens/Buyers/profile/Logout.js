import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { auth } from '../../../db/firebase'

const Logout = () => {
  return (
    <TouchableOpacity style={styles.logout} onPress={() => auth.signOut()}>
        <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  )
}

export default Logout

const styles = StyleSheet.create({
    logout: {
        padding: 20,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff0000',
    },
})