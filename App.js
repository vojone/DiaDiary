import { NavigationContainer } from '@react-navigation/native';

import { View, Text, StyleSheet, Button } from 'react-native';
import BottomNavigator from './components/BottomNavigator';
import MainDrawerNavigator from './components/MainNavigator';

// const Tab = createBottomTabNavigator();

export default function App() {
    const styles = StyleSheet.create({
        main: {
            width: '100%',
            height: '100%',
        },
    });

    return (
        <View style={styles.main}>
            <NavigationContainer>
                <MainDrawerNavigator/>
            </NavigationContainer>
        </View>
    );
}