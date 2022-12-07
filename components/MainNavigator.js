import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { navTextSize, sideNavTextSize } from '../styles/common';
import BottomNavigator from './BottomNavigator';

const SideMenu = createDrawerNavigator();

export default function MainStackNavigator() {
    const styles = StyleSheet.create({
        navitemlabel: {
            fontSize: sideNavTextSize,
        },
    });

    return (
        <SideMenu.Navigator initialRouteName='home'>
            <SideMenu.Screen
                name='home'
                component={BottomNavigator}
                options={{
                    headerTitle: '',
                    drawerLabelStyle: styles.navitemlabel,
                    drawerLabel: 'Záznamy',
                }}
            />
            <SideMenu.Screen 
                name='settings' 
                component={BottomNavigator}
                options={{
                    headerTitle: '',
                    drawerLabelStyle: styles.navitemlabel,
                    drawerLabel: 'Export',
                }}
            />
        </SideMenu.Navigator>
    );
}