import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Buyers/home/Home'
import Item from './screens/Buyers/home/ItemScreen';
import Cart from './screens/Buyers/cart/Cart';
import Profile from './screens/Buyers/profile/Profile'
import Favourites from './screens/Buyers/favourites/Favourites';
import ProfileScreen from './screens/Buyers/profile/options/ProfileScreen';
import OrdersHistory from './screens/Buyers/profile/options/OrdersHistory';
import Checkout from './screens/Buyers/cart/Checkout';
import React, { useEffect } from 'react';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { auth, db } from './db/firebase';
import ForgotPassword from './screens/auth/ForgotPassword';
import { HomeIcon, ShoppingCartIcon, HeartIcon, UserIcon, ReceiptPercentIcon, ShoppingBagIcon, Cog8ToothIcon } from 'react-native-heroicons/outline';
import StartingPage from './screens/auth/StartingPage';
import Orders from './screens/Sellers/Orders/Orders';
import Items from './screens/Sellers/Items/Items';
import OrderScreen from './screens/Sellers/Orders/OrderScreen';
import * as Font from 'expo-font';
import WelcomeScreen from './screens/auth/WelcomeScreen';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import Loading from './screens/Loading';
import { setCustomText } from 'react-native-global-props';
import ChooseSchool from './screens/auth/ChooseSchool';
import AddSchool from './screens/auth/AddSchool';
import ManageItemScreen from './screens/Sellers/Items/ManageItemScreen';
import SchoolAdjustments from './screens/Buyers/profile/options/SchoolAdjustments';
import * as Notifications from 'expo-notifications';

const customTextProps = { 
  style: { 
    fontFamily: 'Circular Std'
  }
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState();
  const [userRole, setUserRole] = React.useState(null);
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [schoolId, setSchoolId] = React.useState();
  const loadFonts = async () => {
    await Font.loadAsync({
      'Circular Std': require('./assets/fonts/circular-std-medium-500.ttf'),
      'Inter': require('./assets/fonts/Inter-Regular.ttf')
    });
    setFontsLoaded(true);
  }

  React.useEffect(() => {
    loadFonts();
    setCustomText(customTextProps);
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      };
    },
  });

  const getRole = () => {
    db.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
      if (doc.exists) {
        setUserRole(doc.data().role);
        setSchoolId(doc.data().schoolId);
      }
    })
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsAuthenticated(true);
      getRole();
      
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  });

  const theme = {
    colors: {
      primary: '#EECEB7',
      secondary: '#252830',
      accent: '#FF7269',
      background: 'rgba(255, 255, 255, 1)',
      item:'rgba(255, 114, 105, 0.8)',
      text: '#000',
      subtext: '#8E94A4',
      button: '#B22222',
      other: '#FFFF66',
      welcome: '#4CAF50',
      activeIcons: '#2E7D32',
      tabBar: 'rgba(255, 255, 255, 0.96)'
    },
    fonts: {
      regular: 'Circular Std',
      welcomeScreen: 'Inter'
    },
  };

  return (
    fontsLoaded &&
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <TailwindProvider>
          <Stack.Navigator>
            {!isAuthenticated && !userRole ? (
              <>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                <Stack.Screen name="StartingPage" component={StartingPage} options={{ headerShown: false }} />
                <Stack.Screen name="ChooseSchool" component={ChooseSchool} options={{ headerShown: false }} />
                <Stack.Screen name="AddSchool" component={AddSchool} options={{ headerShown: false }} />
              </>
            ) : isAuthenticated && !!userRole ? (
              <>
                {userRole === 'buyers' ? (
                  <>
                    <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="Item" component={Item} options={{ headerShown: false }} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="OrdersHistory" component={OrdersHistory} options={{ headerShown: false }} />
                    <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
                  </>
                )
                  : userRole === 'sellers' ? (
                    <>
                      <Stack.Screen name="SellerTabs" component={SellerTabs} options={{ headerShown: false }} />
                      <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
                      <Stack.Screen name="ManageItemScreen" component={ManageItemScreen} options={{ headerShown: false }} />
                      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                      <Stack.Screen name="OrdersHistory" component={OrdersHistory} options={{ headerShown: false }} />
                      <Stack.Screen name="SchoolAdjustments" component={SchoolAdjustments} options={{ headerShown: false }} />
                    </>
                  ) : null}

              </>
            ) :
              <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
            }
          </Stack.Navigator>
        </TailwindProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

function HomeTabs() {

  const theme = useTheme();

  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: Platform.OS === 'android' ? (
        {
          margin: 10,
          elevation: 0,
          backgroundColor: theme.colors.tabBar,
          borderTopWidth: 0,
          borderRadius: 30,
          height: 60,
          ...styles.shadow
        }
      ) : (
        {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: theme.colors.tabBar,
          borderTopWidth: 0,
          borderRadius: 30,
          height: 90,
          ...styles.shadow
        }

      ),
      tabBarActiveTintColor: theme.colors.accent,
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false, tabBarIcon: ({ color, size }) => (
          <View style={styles.tabIcon}>
            <HomeIcon name="home" color={color} size={size} />
            <Text style={{ color: color, fontSize: 12 }}>Home</Text>
          </View>
        )
      }} />
      <Tab.Screen name="Cart" component={Cart} options={{
        headerShown: false, tabBarIcon: ({ color, size }) => (
          <View style={styles.tabIcon}>
            <ShoppingCartIcon name="shopping-cart" color={color} size={size} />
            <Text style={{ color: color, fontSize: 12 }}>Cart</Text>
          </View>
        )
      }} />
      <Tab.Screen name="Favourites" component={Favourites} options={{
        headerShown: false, tabBarIcon: ({ color, size }) => (
          <View style={styles.tabIcon}>
            <HeartIcon name="heart" color={color} size={size} />
            <Text style={{ color: color, fontSize: 12 }}>Favourites</Text>
          </View>
        )
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        headerShown: false, tabBarIcon: ({ color, size }) => (
          <View style={styles.tabIcon}>
            <UserIcon name="user" color={color} size={size} />
            <Text style={{ color: color, fontSize: 12 }}>Profile</Text>
          </View>
        )
      }} />
    </Tab.Navigator>
  );
}

function SellerTabs() {

  const theme = useTheme();

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: Platform.OS === 'android' ? (
        {
          margin: 10,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 30,
          height: 60,
          ...styles.shadow
        }
      ) : (
        {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 30,
          height: 90,
          ...styles.shadow
        }
      ),
      tabBarActiveTintColor: theme.colors.accent,
    }}
    >
      <Tab.Screen name="Home" component={Orders} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
        <View style={styles.tabIcon}>
          <HomeIcon name="home" color={color} size={size} />
          <Text style={{ color: color, fontSize: 12 }}>Home</Text>
        </View>
      ) }} /> 
      <Tab.Screen name="Items" component={Items} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
        <View style={styles.tabIcon}>
          <ReceiptPercentIcon name="shopping-cart" color={color} size={size} />
          <Text style={{ color: color, fontSize: 12 }}>Items</Text>
        </View>
      ) }} />
      <Tab.Screen name="Profiile" component={Profile} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
        <View style={styles.tabIcon}>
          <UserIcon name="user" color={color} size={size} />
          <Text style={{ color: color, fontSize: 12 }}>Profile</Text>
        </View>
      ) }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'android' ? 0 : 15
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  }
});