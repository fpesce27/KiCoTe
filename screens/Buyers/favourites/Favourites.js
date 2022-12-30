import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { db, auth } from '../../../db/firebase';
import Item from '../../components/Item';

const Favourites = () => {

    const [favourites, setFavourites] = useState([]);

    React.useEffect(() => {
        const unsubscribe = db.collection('users').doc(auth.currentUser.uid).collection('favourites').onSnapshot((snapshot) => {
            setFavourites(snapshot.docs.map((doc) => ({
                id: doc.id,
                item: doc.data()
            })))
        })

        return unsubscribe;
    }, [])

    return (
        <SafeAreaView>

            <View style={styles.title}>
                <Text style={styles.titleText}>Favourites</Text>
            </View>

            {favourites.length === 0 ?
                <View style={styles.noFavsContainer}>
                    <Text style={styles.noFavs}>You have no favourites yet</Text>
                </View>
                :

                <ScrollView contentContainerStyle={styles.items}>
                    {favourites.map(({ id, item }) => (
                        <Item key={id} item={item} />
                    ))}
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default Favourites

const styles = StyleSheet.create({
    items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'space-between',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 15,
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    noFavsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '85%',
    },
    noFavs: {
        fontSize: 15,
    }
})