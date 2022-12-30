import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Buyers/home/Home'
import Item from './screens/components/Item';
import Cart from './screens/Buyers/cart/Cart';
import Profile from './screens/Buyers/profile/Profile'
import Favourites from './screens/Buyers/favourites/Favourites';
import ProfileScreen from './screens/Buyers/profile/options/ProfileScreen';
import OrdersHistory from './screens/Buyers/profile/options/OrdersHistory';
import Checkout from './screens/Buyers/cart/Checkout';
import React from 'react';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import { Provider as PaperProvider } from 'react-native-paper';
import { auth } from './db/firebase';
import ForgotPassword from './screens/auth/ForgotPassword';
import { HomeIcon, ShoppingCartIcon, HeartIcon, UserIcon } from 'react-native-heroicons/outline';
import StartingPage from './screens/auth/StartingPage';
import Orders from './screens/Sellers/Orders/Orders';
import Items from './screens/Sellers/Items/Items';
import Configuration from './screens/Sellers/Configuration';
import OrderScreen from './screens/Sellers/Orders/OrderScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  return (
    <NavigationContainer>
      <PaperProvider>
        <TailwindProvider>
            <Stack.Navigator>
              {isAuthenticated ? (
                <>

                  {auth.currentUser.role === 'Buyer' ? (
                    <>
                      <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
                      <Stack.Screen name="Item" component={Item} options={{ headerShown: false }} />
                      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                      <Stack.Screen name="OrdersHistory" component={OrdersHistory} options={{ headerShown: false }} />
                      <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
                    </>
                  )
                  : (
                    <>
                      <Stack.Screen name="SellerTabs" component={SellerTabs} options={{ headerShown: false }} />
                      <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
                    </>
                  )}

                  <Stack.Screen name="StartingPage" component={StartingPage} options={{ headerShown: false }} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                  <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                  <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                </>
              )}
            </Stack.Navigator>
        </TailwindProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<HomeIcon name="home" color={color} size={size} />) }} />
      <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<ShoppingCartIcon name="shopping-cart" color={color} size={size} />) }} />
      <Tab.Screen name="Favourites" component={Favourites} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<HeartIcon name="heart" color={color} size={size} />) }} />
      <Tab.Screen name="Profiile" component={Profile} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<UserIcon name="user" color={color} size={size} />) }} />
    </Tab.Navigator>
  );
}

function SellerTabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Orders} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<HomeIcon name="home" color={color} size={size} />) }} />
      <Tab.Screen name="Items" component={Items} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<ShoppingCartIcon name="shopping-cart" color={color} size={size} />) }} />
      <Tab.Screen name="Configuration" component={Configuration} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<HeartIcon name="heart" color={color} size={size} />) }} />
    </Tab.Navigator>
  );
}
