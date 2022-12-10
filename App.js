import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import MainDrawerNavigator from './components/MainNavigator';
import seedData from './global';

const clearData = true;

// const Tab = createBottomTabNavigator();

export default function App() {
    useEffect(() => {
        seedData(clearData);
    }, [clearData]);

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