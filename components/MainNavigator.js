/**
 * @author Vojtěch Dvořák (xdvora3o)
 */


import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { activeColor, headerHeight, navTextSize, primaryColor, sideNavTextSize } from '../styles/common';
import InitSettingsScreen from '../views/InitialSettings';
import StackNavigator from './StackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExportScreen from '../views/ExportScreen';
import SettingsScreen from '../views/SettingsScreen';

const SideMenu = createDrawerNavigator();


export default function MainDrawerNavigator({ navigation }) {
    const styles = StyleSheet.create({
        navitemlabel: {
            fontSize: sideNavTextSize,
        },
    });

    return (
        <SideMenu.Navigator initialRouteName='Records'>
            <SideMenu.Screen
                name='Records'
                component={StackNavigator}
                options={{
                    headerTitle: '',
                    drawerLabelStyle: styles.navitemlabel,
                    drawerIcon: () => { return(<MaterialCommunityIcons name="pencil" size={sideNavTextSize}></MaterialCommunityIcons>); },
                    drawerLabel: 'Záznamy',
                    drawerActiveBackgroundColor: activeColor,
                    drawerActiveTintColor: primaryColor,
                }}
            />
            <SideMenu.Screen 
                name='Export' 
                component={ExportScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    drawerLabelStyle: styles.navitemlabel,
                    drawerLabel: 'Export',
                    drawerIcon: () => { return(<MaterialCommunityIcons name="export" size={sideNavTextSize}></MaterialCommunityIcons>); },
                    drawerActiveBackgroundColor: activeColor,
                    drawerActiveTintColor: primaryColor,
                }}
            />
            <SideMenu.Screen 
                name='Settings' 
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    headerTitle: '',
                    drawerLabelStyle: styles.navitemlabel,
                    drawerLabel: 'Nastavení',
                    drawerIcon: () => { return(<FontAwesome name="gear" size={sideNavTextSize}></FontAwesome>); },
                    swipeEnabled: false,
                    drawerActiveBackgroundColor: activeColor,
                    drawerActiveTintColor: primaryColor,
                }}
            />
            <SideMenu.Screen 
                name='InitialSettings' 
                component={InitSettingsScreen}
                options={{ 
                    drawerItemStyle: {padding: 0, margin: 0, width: 0, height: 0},
                    headerShown: false,
                    drawerLabel: () => {return <View style={{height: 0}}></View>},
                    swipeEnabled: false,
                }}
            />
        </SideMenu.Navigator>
    );
}