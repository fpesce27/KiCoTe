import { View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import React from 'react'
import Item from '../../components/Item';
import { items, categories } from '../../constants'
import { useTheme } from 'react-native-paper';


const Body = (props) => {

    const theme = useTheme()

    const filter = (item, category) => {
        return item.name.toLowerCase().includes(props.searchPhrase.toLowerCase()) && item.categories.includes(category)
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.categories}>
                    {categories.map((category, index) => (
                        <View style={{marginBottom: 20}} key={index}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>{category}</Text>
                            <View style={styles.items}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {items.filter(item => filter(item, category)).map((item, index) => (
                                    <View style={styles.item} key={item.id}>
                                        <Item item={item} />
                                    </View>
                                ))}
                                </ScrollView>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Body

const styles = StyleSheet.create({
    categories: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 20,
        paddingBottom: 450,
    },
    items: {
        flexDirection: 'row',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
})