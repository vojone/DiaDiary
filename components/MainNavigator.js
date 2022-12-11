import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { bottomTabBarActiveBgColor, headerHeight, navTextSize, primaryColor, sideNavTextSize } from '../styles/common';
import InitSettingsScreen from '../views/InitialSettings';
import StackNavigator from './StackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExportScreen from '../views/ExportScreen';

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
                    drawerActiveBackgroundColor: bottomTabBarActiveBgColor,
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
                    swipeEnabled: false,
                    drawerActiveBackgroundColor: bottomTabBarActiveBgColor,
                    drawerActiveTintColor: primaryColor,
                }}
            />
            <SideMenu.Screen 
                name='Settings' 
                component={InitSettingsScreen}
                options={{
                    headerShown: false,
                    headerTitle: '',
                    drawerLabelStyle: styles.navitemlabel,
                    drawerLabel: 'Nastavení',
                    drawerIcon: () => { return(<FontAwesome name="gear" size={sideNavTextSize}></FontAwesome>); },
                    swipeEnabled: false,
                    drawerActiveBackgroundColor: bottomTabBarActiveBgColor,
                    drawerActiveTintColor: primaryColor,
                }}
            />
        </SideMenu.Navigator>
    );
}