import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { db, auth } from '../../../db/firebase';
import Item from '../../components/Item';
import { HeartButton } from '../../components/Controls';

const Favourites = () => {

    const [favourites, setFavourites] = useState([]);
    const [padding, setPadding] = useState(0);

    React.useEffect(() => {
        const unsubscribe = db.collection('Users').doc(auth.currentUser.uid).collection('Favourites').onSnapshot((snapshot) => {
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
                <FlatList
                    data={favourites}
                    renderItem={({ item }) => (
                        <View style={styles.item}> 
                            <View style={{position: 'absolute', zIndex:1, right: -5, top: -5}}>
                                <HeartButton item={item.item} />
                            </View>
                            <Item
                                id={item.id}
                                item={item.item}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    style={{paddingBottom: 300 + padding}}
                    onContentSizeChange={(w,h) => setPadding(h)}
                />

            }
        </SafeAreaView>
    )
}

export default Favourites

const styles = StyleSheet.create({
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
    },
    item: {
        width: '45%', 
        height:'85%', 
        backgroundColor:'#fff', 
        margin:10,
        borderRadius: 50,
        flexDirection: 'row',
        marginBottom: 20,
    }
})