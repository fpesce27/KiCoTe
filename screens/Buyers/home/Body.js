import { View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import React from 'react'
import Item from '../../components/Item';
import { items } from '../../constants'


const Body = (props) => {

    return (
        <SafeAreaView >
            <ScrollView>
                <View style={styles.items}>
                    {items.filter(item => item.name.toLowerCase().includes(props.searchPhrase.toLowerCase())).map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Body

const styles = StyleSheet.create({
    items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'space-between',
        paddingBottom: 350,
    },
})