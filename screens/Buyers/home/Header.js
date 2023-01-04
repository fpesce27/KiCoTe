import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MagnifyingGlassIcon, BellAlertIcon, AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';
import { auth } from '../../../db/firebase';
import { useTheme } from 'react-native-paper';
import SearchBar from './SearchBar';

const Header = (props) => {

  const theme = useTheme()

  return (
    <View>

      <View style={styles.headerTop}>

        <View style={styles.headerLeft}>

          <Image
            style={styles.logo}
            source={{ uri: auth.currentUser.photoURL }}
          />

          <View className='flex-col space-y-2'>
            <Text style={styles.headerText}>Bienvenido, </Text>
            <Text style={styles.textName}>{auth.currentUser.displayName}</Text>
          </View>

        </View>

        <View className='flex-row space-x-4'>

          <TouchableOpacity style={{...styles.icon, backgroundColor:'#fff'}}>
            <BellAlertIcon color={theme.colors.accent} />
          </TouchableOpacity>

        </View>

      </View>

      <View style={{ padding: 20, flexDirection: 'row' }}>

          <SearchBar searchPhrase={props.searchPhrase} setSearchPhrase={props.setSearchPhrase} />

          <TouchableOpacity onPress={() => props.bottomSheetFilter.current?.present()} style={{ ...styles.icon,backgroundColor: theme.colors.accent }}>
            <AdjustmentsHorizontalIcon style={{ color: theme.colors.primary }} />
          </TouchableOpacity>

      </View>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
  },
  headerText: {
    color: '#9CA3AF',
    marginRight: 10,
    fontSize: 16,
  },
  textName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
})