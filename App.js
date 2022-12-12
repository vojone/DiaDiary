/**
 * The main body of DiaDiary app
 */


import { NavigationContainer } from '@react-navigation/native';
import { createRef, useEffect } from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import MainDrawerNavigator from './components/MainNavigator';
import seedData from './global';

const clearData = true;

const navigationRef = createRef();

export default function App() {
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