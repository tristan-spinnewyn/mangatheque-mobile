import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./pages/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import Planning from "./pages/Planning";
import Account from "./pages/Account";
import Collection from "./pages/Collection";
import Rechercher from "./pages/Rechercher";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

function MyTabs(){
  return (<Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
          } else if (route.name === 'Planning') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
          } else if(route.name === 'Account'){
              iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline'
          } else if(route.name === 'Collection'){
              iconName = focused ? 'ios-book' : 'ios-book-outline'
          } else if(route.name === 'Rechercher')
              iconName = focused ? 'ios-search-circle' : 'ios-search-circle-outline'

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
  >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Planning" component={Planning}/>
      <Tab.Screen name="Account" component={Account}/>
      <Tab.Screen name="Collection" component={Collection}/>
      <Tab.Screen name="Rechercher" component={Rechercher}/>
  </Tab.Navigator>)
}

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
          <MyTabs/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
