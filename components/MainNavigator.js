import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { navTextSize, sideNavTextSize } from '../styles/common';
import StackNavigator from './StackNavigator';

const SideMenu = createDrawerNavigator();

export default function MainDrawerNavigator({ navigation }) {
    const styles = StyleSheet.create({
        navitemlabel: {
            fontSize: sideNavTextSize,
        },
    });

    return (
        <SideMenu.Navigator initialRouteName='home'>
            <SideMenu.Screen
                name='home'
                component={StackNavigator}
                options={{
                    headerTitle: '',
                    drawerLabelStyle: styles.navitemlabel,
                    drawerLabel: 'Záznamy',
                }}
            />
            <SideMenu.Screen 
                name='settings' 
                component={StackNavigator}
                options={{
                    headerTitle: '',
                    drawerLabelStyle: styles.navitemlabel,
                    drawerLabel: 'Export',
                }}
            />
        </SideMenu.Navigator>
    );
}