import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'

export const SearchBar = (props) => {
  
    return (
    <View style={styles.searchBar}>
        <MagnifyingGlassIcon style={{color : 'lightgray'}} />
        <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="lightgray"
            value={props.searchPhrase}
            onChangeText={props.setSearchPhrase}
        />
        <AdjustmentsHorizontalIcon style={{color : 'lightgray'}}/>
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
        borderRadius: 10,
      },
      searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#000',
      },
})