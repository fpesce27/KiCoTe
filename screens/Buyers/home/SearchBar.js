import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useTheme } from 'react-native-paper'
import { categories } from '../../constants'

export const SearchBar = (props) => {
  
  const theme = useTheme()

    return (
    <View style={{...styles.searchBar, backgroundColor:theme.colors.secondary}}>
        <MagnifyingGlassIcon style={{color : 'lightgray'}} />
        <TextInput
            style={{...styles.searchInput, color:theme.colors.text}}
            placeholder="Buscar..."
            placeholderTextColor="lightgray"
            value={props.searchPhrase}
            onChangeText={props.setSearchPhrase}
            cursorColor={theme.colors.text}
            selectionColor={theme.colors.text}
            
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
        padding: 10,
        margin: 0,
        borderRadius: 24,
        marginBottom: 20,
        width: '80%',
        height: 65,
      },
      searchInput: {
        flex: 1,
        marginLeft: 10,
      },
})