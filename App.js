import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './views/HomeScreen';
import HistoryScreen from './views/HistoryScreen';


import { Button, View, Text, TouchableHighlight } from 'react-native';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />),
        headerRight: () => (
          <TouchableHighlight onPress={() => alert('This is a button!')}>
            <View style={{ width: 100, flexDirection: 'row' }}>
              <Text style={{fontSize: 16}}>Settings</Text>
              <MaterialCommunityIcons name="cog" size={21} color="black" style={{marginLeft: 4}}/>
            </View>
          </TouchableHighlight>
        )}
        }/>
      <Tab.Screen name="History" component={HistoryScreen} options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          )}}/>
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen name="History" component={HistoryScreen} />
          <MyTabs />
        </NavigationContainer>
    );
}