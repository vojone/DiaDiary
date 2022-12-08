import { StyleSheet, Text, View, TextInput, Button, Vibration } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Record } from '../models/record';
import { useState, useRef } from 'react';
import BloodSugarTab from './BloodSugarTab';
import FoodTab from './FoodTab';
import DateTimePicker from 'react-native-modal-datetime-picker';
import OtherTab from './OtherTab';
import { primaryColor } from '../styles/common';
import DateTimePickerWithText from '../components/DateTimePickerWithText';

export default function RecordAddScreen({ navigation }) {
    let record = Record.default();
    const bloodSugarTab = useRef();
    const foodTab = useRef();
    const otherTab = useRef();

    const [dateTime, setDateTime] = useState(record.dateTime);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const onSave = () => {
        record.setProperties(bloodSugarTab.current.getData());

        record.save().then(
            (newRec) => {
                record = Record.default();

                bloodSugarTab.current.refresh(record);

                Vibration.vibrate(100);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    const onCancel = () => {
        record = Record.default(); 
        bloodSugarTab.current.refresh(record);
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
        setDateTime(date);
    };

    const timeSelectionConfirm = (time) => {
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
                        options={{
                            tabBarLabel: 'Hladina cukru',
                            tabBarLabelStyle: {
                                textTransform: 'capitalize',
                            },
                            tabBarIndicatorStyle: StyleSheet.create({
                                borderTopColor: primaryColor,
                                borderTopWidth: 3,
                            }),
                        }}
                    >
                        {props => <BloodSugarTab {...props} model={record} screenref={bloodSugarTab}></BloodSugarTab>}
                    </Tab.Screen>
                    <Tab.Screen
                        name="food"
                        options={{
                            tabBarLabel: 'Jídlo',
                            tabBarLabelStyle: {
                                textTransform: 'capitalize',
                            },
                            tabBarIndicatorStyle: StyleSheet.create({
                                borderTopColor: primaryColor,
                                borderTopWidth: 3,
                            }),
                        }}
                    >
                        {props => <FoodTab {...props} model={record} screenref={foodTab}></FoodTab>}
                    </Tab.Screen>
                    <Tab.Screen
                        name="other"
                        component={OtherTab}
                        options={{
                            tabBarLabel: 'Ostatní',
                            tabBarLabelStyle: {
                                textTransform: 'capitalize',
                            },
                            tabBarIndicatorStyle: StyleSheet.create({
                                borderTopColor: primaryColor,
                                borderTopWidth: 3,
                            }),
                        }}
                    >
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
            <View style={styles.timeinputcontainer}>
                <DateTimePickerWithText
                    value={dateTime}
                    mode="date"
                    label="Datum"
                    onConfirm={timeSelectionConfirm}
                >
                </DateTimePickerWithText>
                <DateTimePickerWithText
                    value={dateTime}
                    mode="time"
                    label="Čas"
                    onConfirm={timeSelectionConfirm}
                >
                </DateTimePickerWithText>
            </View>
            <View style={styles.controlpanel}>
                <Button title="Zahodit" onPress={onCancel}></Button>
                <Button title="Přidat záznam" onPress={onSave}></Button>
            </View>
        </View>
    );
}
    