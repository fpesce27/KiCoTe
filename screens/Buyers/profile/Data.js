import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { auth } from '../../../db/firebase'
import { useTheme } from 'react-native-paper'

const Data = () => {
    const theme = useTheme()

    return (
        <>
            <View style={styles.profileImage}>
                <Image source={{ uri: auth.currentUser.photoURL }} style={styles.image} />
            </View>
            <View style={styles.profileDetails}>
                <Text style={{ fontSize:20, color:theme.colors.secondary }}>{auth.currentUser.displayName}</Text>
                <Text style={{...styles.email, color:theme.colors.secondary}}>{auth.currentUser.email}</Text>
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
    email: {
        fontSize: 16,
        paddingTop: 5,
        opacity: 0.5,
    },
})