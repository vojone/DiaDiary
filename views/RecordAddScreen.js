import { StyleSheet, Text, View, TextInput, Button, Vibration } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Record } from '../models/record';
import { useState } from 'react';
import BloodSugarTab from './BloodSugarTab';
import FoodTab from './FoodTab';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default function RecordAddScreen({ navigation }) {
    const [input, setInput] = useState('');
    const [saveKeyInput, setSaveKeyInput] = useState('');
    const [keyInput, setKeyInput] = useState('');

    const [dateTime, setDateTime] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const onSave = () => {
        Vibration.vibrate([1000]);
    }

    const onRetrieve = () => {
        
    }

    const inputChange = text => {
       
    }

    const getDateFormatted = () => {
        let year = dateTime.getFullYear();
        let day = dateTime.getDate();
        let month = dateTime.getMonth();

        return `${day}. ${month}. ${year}`; //Day. Month. Year
    }

    const getTimeFormatted = () => {
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; //Hours:Minutes
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    }

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    }

    const dateSelectionConfirm = (date) => {
        hideDatePicker();

        setDateTime(date);
    };

    const timeSelectionConfirm = (time) => {
        hideTimePicker();

        setDateTime(time);
    };

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
        },

        timeinputcontainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
        },
    
        rightaligned: {
            textAlign: 'right',
        },
    });
    
    return (
        <View style={styles.maincontainer}>
            <View style={styles.tabcontainer}>            
                <Tab.Navigator>
                    <Tab.Screen
                        name="glycemia"
                        component={BloodSugarTab}
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
                        component={FoodTab}
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
                        component={BloodSugarTab}
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
            <View style={styles.timeinputcontainer}>
                <View>
                    <Text>Datum</Text>
                    <Text
                        onPress={showDatePicker}
                    >
                        {getDateFormatted()}
                    </Text>
                    <DateTimePicker 
                        date={dateTime}
                        mode="date"
                        isVisible={isDatePickerVisible}
                        onCancel={hideDatePicker}
                        onConfirm={dateSelectionConfirm}
                    >
                    </DateTimePicker>
                </View>
                <View>
                    <Text style={styles.rightaligned}>Čas</Text>
                    <Text
                        onPress={showTimePicker}
                    >
                        {getTimeFormatted()}
                    </Text>
                    <DateTimePicker 
                        date={dateTime}
                        mode="time"
                        isVisible={isTimePickerVisible}
                        onCancel={hideTimePicker}
                        onConfirm={timeSelectionConfirm}
                    >
                    </DateTimePicker>
                </View>
            </View>
            <View style={styles.controlpanel}>
                <Button title="Zahodit"></Button>
                <Button title="Přidat záznam" onPress={onSave}></Button>
            </View>
        </View>
    );
}
    