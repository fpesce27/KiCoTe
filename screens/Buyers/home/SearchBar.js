import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useTheme } from 'react-native-paper'
import { categories } from '../../constants'

export const SearchBar = (props) => {
  
  const theme = useTheme()

    return (
    <View style={styles.searchBar}>
        <MagnifyingGlassIcon style={{color : 'lightgray'}} />
        <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="lightgray"
            value={props.searchPhrase}
            onChangeText={props.setSearchPhrase}
        />
      </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        margin: 0,
        borderRadius: 50,
        marginBottom: 20,
        width: '80%',
        height: 50,
      },
      searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#000',
      },
})