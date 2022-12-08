import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Record } from '../models/record';
import { useState } from 'react';
import BloodSugarInput from '../components/BloodSugarInput';
import { NavigationContainer } from '@react-navigation/native';

export default function RecordAddScreen({ navigation }) {
    const [input, setInput] = useState('');
    const [saveKeyInput, setSaveKeyInput] = useState('');
    const [keyInput, setKeyInput] = useState('');

    const onSave = () => {

    }

    const onRetrieve = () => {
        
    }

    const inputChange = text => {
       
    }

    const keyInputChange = text => {
        setKeyInput(text);
    }

    const Tab = createMaterialTopTabNavigator();

    const styles = StyleSheet.create({
        tabcontainer: {
            flex: 1,
        },

        controlpanel: {
            height: 80,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            paddingLeft: 20,
            paddingRight: 20,
        },

        maincontainer: {
            height: '100%',
        }
    });
    
    return (
        <View style={styles.maincontainer}>
            <View style={styles.tabcontainer}>            
                <Tab.Navigator>
                    <Tab.Screen
                        name="glycemia"
                        component={BloodSugarInput}
                        options={{
                            tabBarLabel: 'Hladina cukru',
                            tabBarLabelStyle: {
                                textTransform: 'capitalize',
                            }
                        }}
                    >
                    </Tab.Screen>
                    <Tab.Screen
                        name="food"
                        component={BloodSugarInput}
                        options={{
                            tabBarLabel: 'Jídlo',
                            tabBarLabelStyle: {
                                textTransform: 'capitalize',
                            }
                        }}
                    >
                    </Tab.Screen>
                    <Tab.Screen
                        name="other"
                        component={BloodSugarInput}
                        options={{
                            tabBarLabel: 'Ostatní',
                            tabBarLabelStyle: {
                                textTransform: 'capitalize',
                            }
                        }}
                    >
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
            <View style={styles.controlpanel}>
                <Button title="Zahodit"></Button>
                <Button title="Přidat záznam"></Button>
            </View>
        </View>
    );
}
    