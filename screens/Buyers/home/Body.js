import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import Item from '../../components/Item';
import { items, categories } from '../../constants'
import BottomSheetFilter from './BottomSheetFilter';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';

const Body = (props) => {

    const [contentHeight, setContentHeight] = React.useState(0)
    const [filters, setFilters] = React.useState([{ minPrice: 0, maxPrice: 500 }, { categories:[] }])
    const theme = useTheme()

    return (
        <SafeAreaView>
            <View style={{ paddingBottom:300 }}>
            <FlatList
                data={categories.filter(category => filters[1].categories.length === 0 || filters[1].categories.includes(category))}
                renderItem={({ item, index }) => 
                    <View style={{padding:20}}>
                        <Category category={item} key={index} props={props} filters={filters} />
                    </View>
                }
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={(width, height) => setContentHeight(height)}
                contentContainerStyle={{ paddingBottom: contentHeight / categories.length }}
            />
            </View>
            <BottomSheetFilter bottomSheetFilter={props.bottomSheetFilter} filters={filters} setFilters={setFilters} />
        </SafeAreaView>
    )
}

const Category = (props) => {

    const filter = (item, category) => {
        return item.name.toLowerCase().includes(props.props.searchPhrase.toLowerCase()) && item.categories.includes(category) && item.price >= props.filters[0].minPrice && item.price <= props.filters[0].maxPrice
    }

    return (
        <View style={{ marginBottom: 20 }} key={props.index}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{props.category}</Text>
            <FlatList
                data={items.filter(item => filter(item, props.category))}
                renderItem={({ item }) =>
                    <View style={styles.item} key={item.id}>
                        <Item item={item} />
                    </View>
                }
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            />

        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    item: {
        borderRadius: 50,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 225,
    },
})