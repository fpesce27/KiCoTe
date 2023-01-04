import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { SearchBar } from '../../../screens/Buyers/home/SearchBar'
import { db } from '../../../db/firebase'
import { ScrollView } from 'react-native'
import { Item } from '../../components/Item'
import { items as i } from '../../constants'
import { useTheme } from 'react-native-paper'

const Items = () => {
  
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    
  }, [])

  
  return (
    <SafeAreaView>

      <Header />
      
      <View style={styles.searchBar}>
        <View style={{width: '90%'}}>
          <SearchBar seller={true}/>
        </View>
      </View>

      <View>
        <ScrollView>
          
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export default Items

const Header = () => {

  const theme = useTheme()

  return (
    <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>Items</Text>
        </View>
        <TouchableOpacity>
          <Text style={{fontSize:40, color:theme.colors.primary}}>+</Text>
        </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 15,
    flexDirection: 'row',
  },
  title: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '65%',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  searchBar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})