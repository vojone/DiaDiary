import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';

const SideMenu = createDrawerNavigator();

export default function MainStackNavigator() {

    return (
        <SideMenu.Navigator initialRouteName='home'>
            <SideMenu.Screen
                name='home'
                component={BottomNavigator}
                options={{
                    headerTitle: '',
                    drawerLabel: 'Záznamy',
                }}
            />
            <SideMenu.Screen 
                name='settings' 
                component={BottomNavigator}
                options={{
                    headerTitle: '',
                    drawerLabel: 'Export',
                }}
            />
        </SideMenu.Navigator>
    );
}