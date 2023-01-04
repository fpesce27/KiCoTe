import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const FilterCategories = (props) => {

    const theme = useTheme()

    const setCategory = () => {
        props.setFilters([
            props.filters[0],
            {
                categories: props.filters[1].categories.includes(props.category) ?
                    props.filters[1].categories.filter(category => category !== props.category) :
                    [...props.filters[1].categories, props.category]
            }
        ])
    }

    return (
        <TouchableOpacity onPress={setCategory} style={[styles.container, { backgroundColor: props.filters[1].categories.includes(props.category) ? theme.colors.accent : '#fff' }]}>
            <View>
                <Image
                    style={styles.image}
                    source={require('../../../assets/icon.png')}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.category}</Text>
            </View>
        </TouchableOpacity>
    )
}



export default FilterCategories

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 10,
        borderRadius: 100,
    },

})