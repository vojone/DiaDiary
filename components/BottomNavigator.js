/**
 * @author Vojtěch Dvořák (xdvora3o)
 */

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HistoryScreen from '../views/HistoryScreen';

import { StyleSheet } from 'react-native';
import { bottomBarHeight, activeColor, navTextSize, pressUnderlayColor, primaryColor, bottomTabBarActiveColor } from '../styles/common';
import RecordAddScreen from '../views/RecordAddScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChartScreen from '../views/ChartScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({ navigation }) {
    const styles = StyleSheet.create({
        navbutton: {
            fontSize: navTextSize,
        },
    });

    return (
        <Tab.Navigator initialRouteName='new'>
            <Tab.Screen
                name='new'
                component={RecordAddScreen}
                options={{ 
                    lazy: true,
                    tabBarLabelStyle: styles.navbutton,
                    tabBarLabel: 'Přidat záznam',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="plus" color={color} size={size} /> 
                    ),
                    headerTitle: '',
                    headerShown: false,
                    tabBarStyle: {
                        height: bottomBarHeight,
                    },
                    tabBarActiveTintColor: primaryColor,
                    tabBarActiveBackgroundColor: bottomTabBarActiveColor,
                }}
            />
            <Tab.Screen 
                name='Graf' 
                component={ChartScreen}
                options={{ 
                    lazy: true,
                    tabBarLabelStyle: styles.navbutton,
                    tabBarLabel: 'Graf',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="chart-bell-curve-cumulative" color={color} size={size} /> 
                    ), 
                    headerTitle: '',
                    headerShown: false,
                    tabBarStyle: {
                        height: bottomBarHeight,
                    },
                    tabBarActiveTintColor: primaryColor,
                    tabBarActiveBackgroundColor: bottomTabBarActiveColor,
                }} 
            />
            <Tab.Screen 
                name='Historie' 
                component={HistoryScreen}
                options={{ 
                    lazy: true,
                    tabBarLabelStyle: styles.navbutton,
                    tabBarLabel: 'Historie',
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="back-in-time" color={color} size={size} /> 
                    ),
                    headerTitle: '',
                    headerShown: false,
                    tabBarStyle: {
                        height: bottomBarHeight,
                    },
                    tabBarActiveTintColor: primaryColor,
                    tabBarActiveBackgroundColor: bottomTabBarActiveColor,
                }}
            />
        </Tab.Navigator>
    );
}