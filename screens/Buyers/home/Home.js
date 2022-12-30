import { SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import Header from './Header';
import Body from './Body';

const Home = (props) => {

    const [searchPhrase, setSearchPhrase] = React.useState('');
    //const role = useContext(RoleContext)

    return (
        <SafeAreaView>
            <Header searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}/>
            <Body searchPhrase={searchPhrase}/>
        </SafeAreaView>
    )
}

export default Home;


