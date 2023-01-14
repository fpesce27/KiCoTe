import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { SearchBar } from '../../../screens/Buyers/home/SearchBar'
import { auth, db } from '../../../db/firebase'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Background from '../../components/Background'
import * as FileSystem from 'expo-file-system';

const Items = () => {

  const [items, setItems] = React.useState([])
  const theme = useTheme()
  const navigation = useNavigation()
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    db.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
      db.collection('items').where('schoolId', '==', doc.data().schoolId).orderBy('name', 'asc').onSnapshot(querySnapshot => {
        setItems(querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }))
      })
    })
  }, [])

  const filter = (item) => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  }

  return (
    <Background>
    <SafeAreaView>

      <Header />

      <View style={styles.searchBar}>
        <SearchBar seller={true} searchPhrase={search} setSearchPhrase={setSearch} />
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => filter(item) &&
          <TouchableOpacity onPress={() => navigation.navigate('ManageItemScreen', { item: item })} style={{...styles.item, backgroundColor:theme.colors.primary}}>
            <View style={styles.orderBottom}>
              <Image style={styles.orderImage} source={{ uri: item.image }} />
              <Text>{item.name}</Text>
              <Text>${item.price}</Text>
            </View>
          </TouchableOpacity>
        }
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 300 }}
      />

    </SafeAreaView>
    </Background>
  )
}

export default Items

const Header = () => {

  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{...styles.text, color:theme.colors.secondary}}>Items</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ManageItemScreen')}>
        <Text style={{ fontSize: 40, color: theme.colors.secondary }}>+</Text>
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
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    padding: 10,
    margin: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderBottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
})