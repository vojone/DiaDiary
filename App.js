/**
 * The main body of DiaDiary app
 */


import { NavigationContainer } from '@react-navigation/native';
import { createRef, useEffect } from 'react';

import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import MainDrawerNavigator from './components/MainNavigator';
import seedData from './global';

const clearData = false;

const navigationRef = createRef();

/**
 * The root component of the app
 */
export default function App() {
    StatusBar.setBarStyle('dark-content', true);

    useEffect(() => {
        seedData(navigationRef, clearData);
    }, [clearData]);

    const styles = StyleSheet.create({
        main: {
            width: '100%',
            height: '100%',
        },
    });

    return (
        <View style={styles.main}>
            <NavigationContainer ref={navigationRef}>
                <MainDrawerNavigator/>
            </NavigationContainer>
        </View>
    );
}