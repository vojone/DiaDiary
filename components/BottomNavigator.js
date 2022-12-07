import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../views/HomeScreen';
import HistoryScreen from '../views/HistoryScreen';

import { Button, StyleSheet } from 'react-native';
import { navTextSize } from '../styles/common';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    const styles = StyleSheet.create({
        navbutton: {
            fontSize: navTextSize,
        },
    });

    return (
        <Tab.Navigator initialRouteName='new'>
            <Tab.Screen
                name='new'
                component={HomeScreen}
                options={{ 
                    lazy: true,
                    tabBarLabelStyle: styles.navbutton,
                    tabBarLabel: 'Přidat záznam',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="plus" color={color} size={size} /> 
                    ),
                    headerTitle: '',
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name='Graf' 
                component={HistoryScreen}
                options={{ 
                    lazy: true,
                    tabBarLabelStyle: styles.navbutton,
                    tabBarLabel: 'Graf',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="chart-bell-curve-cumulative" color={color} size={size} /> 
                    ), 
                    headerTitle: '',
                    headerShown: false,
                }} 
            />
            <Tab.Screen 
                name='Historie' 
                component={HistoryScreen}
                options={{ 
                    lazy: true,
                    tabBarLabelStyle: styles.navbutton,
                    tabBarLabel: 'Histore',
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="back-in-time" color={color} size={size} /> 
                    ),
                    headerTitle: '',
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}