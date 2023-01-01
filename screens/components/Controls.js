import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { db, auth } from '../../db/firebase';

export function Controls(props) {   
    
    return (
        <View style={styles.controlsContainer}>
            <BackButton /> 
            <HeartButton item={props.item}/>
        </View>
    )
}

export function BackButton() {
    const navigation = useNavigation();
    return (
        <View style={styles.controls}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <ArrowLeftIcon style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

export function HeartButton(props) {
    const [isFavourite, setFavourite] = useState(false);

    return (
        <View style={styles.controls}>
            <TouchableOpacity style={styles.backButton} onPress={() => {
                handleFavs(props.item);
                setFavourite(!isFavourite);
            }}>
                {isFavourite ? <HeartIconSolid style={{ ...styles.icon, color: 'lightgreen' }} /> : <HeartIcon style={styles.icon} />}
            </TouchableOpacity>
        </View>
    )
}

function handleFavs(item) {
    db.collection('users').doc(auth.currentUser.uid).collection('favourites').where('id', '==', item.id).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            db.collection('users').doc(auth.currentUser.uid).collection('favourites').add({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
            })
        } else {
            querySnapshot.forEach((doc) => {
                db.collection('users').doc(auth.currentUser.uid).collection('favourites').doc(doc.id).delete();
            })
        }
    })
}

const styles = StyleSheet.create({
    controlsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controls: {
        padding: 20,
    },
    backButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,
    },
    icon: {
        width: 20,
        height: 20,
        color: 'black',
    },
})