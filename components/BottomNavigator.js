import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HistoryScreen from '../views/HistoryScreen';

import { StyleSheet } from 'react-native';
import { bottomBarHeight, bottomTabBarActiveBgColor, navTextSize, pressUnderlayColor, primaryColor } from '../styles/common';
import RecordAddScreen from '../views/RecordAddScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
                    tabBarActiveBackgroundColor: bottomTabBarActiveBgColor,
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
                    tabBarStyle: {
                        height: bottomBarHeight,
                    },
                    tabBarActiveTintColor: primaryColor,
                    tabBarActiveBackgroundColor: bottomTabBarActiveBgColor,
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
                    tabBarStyle: {
                        height: bottomBarHeight,
                    },
                    tabBarActiveTintColor: primaryColor,
                    tabBarActiveBackgroundColor: bottomTabBarActiveBgColor,
                }}
            />
        </Tab.Navigator>
    );
}