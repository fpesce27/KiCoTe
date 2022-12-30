import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { auth } from '../../../db/firebase'

const Data = () => {
    return (
        <>
            <View style={styles.profileImage}>
                <Image source={{ uri: auth.currentUser.photoURL }} style={styles.image} />
            </View>
            <View style={styles.profileDetails}>
                <Text style={styles.name}>{auth.currentUser.displayName}</Text>
                <Text style={styles.email}>{auth.currentUser.email}</Text>
            </View>
        </>
    )
}

export default Data

const styles = StyleSheet.create({
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    profileDetails: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: 'gray',
        paddingTop: 5,
    },
})