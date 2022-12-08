import { NavigationContainer, TouchableHighlight, View, Text } from '@react-navigation/native';
import { createBottomTabNavigator, createNativeStackNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from './views/HomeScreen';
import HistoryScreen from './views/HistoryScreen';
import ChartScreen from './views/ChartScreen';

import HeaderButton from './components/HeaderButton';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen
            name='Nový záznam'
            component={HomeScreen}
            options={{ 
                tabBarLabel: 'Přidat záznam',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="plus" color={color} size={size} /> 
                ), 
                headerRight: () => (<HeaderButton/>)
            }}
        />
        <Tab.Screen 
            name='Graf' 
            component={ChartScreen}
            options={{ 
                tabBarLabel: 'Graf',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons name="chart-bell-curve-cumulative" color={color} size={size} /> 
              ), 
              headerRight: () => (<HeaderButton/>)
              
            }} 
        />
        <Tab.Screen 
            name='Historie' 
            component={HistoryScreen}
            options={{ 
                tabBarLabel: 'Historie',
                tabBarIcon: ({color, size}) => (
                  <Entypo name="back-in-time" color={color} size={size} /> 
              ), 
              headerRight: () => (<HeaderButton/>)
            }}  
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}