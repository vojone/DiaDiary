/**
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import EntryDetail from '../views/EntryDetail';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="main">
            <Stack.Screen
                name="main"
                options={{
                    headerShown: false
                }}
                component={BottomNavigator}
            >
            </Stack.Screen>
            <Stack.Screen
                name="EntryDetail"
                component={EntryDetail}
            >
            </Stack.Screen>
        </Stack.Navigator>
    );
}
