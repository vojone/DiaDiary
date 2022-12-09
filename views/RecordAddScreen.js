import { StyleSheet, Text, View, TextInput, Button, Vibration, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Record } from '../models/record';
import { useState, useRef, useEffect } from 'react';
import BloodSugarTab from './BloodSugarTab';
import FoodTab from './FoodTab';
import DateTimePicker from 'react-native-modal-datetime-picker';
import OtherTab from './OtherTab';
import { primaryColor } from '../styles/common';
import DateTimePickerWithText from '../components/DateTimePickerWithText';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';

export default function RecordAddScreen({ navigation }) {
    let record = Record.default();
    const bloodSugarTab = useRef();
    const foodTab = useRef();
    const otherTab = useRef();

    const [dateTime, setDateTime] = useState(record.dateTime);
    const [isDateModified, setIsDateModified] = useState(false);
    const [isTimeModified, setIsTimeModified] = useState(false);
    const [isDateTimeSync, setDateTimeSync] = useState(true);

    useEffect(() => {
        const int = setInterval(() => {
            if(isDateTimeSync == true) {
                syncDateTime();
            }
        }, 5000);

        return () => {
            clearInterval(int);
        };
    }, [isDateTimeSync]);

    const onSave = () => {
        record.setProperties(bloodSugarTab.current.getData());

        record.save().then(
            (newRec) => {
                record = Record.default();
                bloodSugarTab.current.refresh(record);

                syncDateTime(true);

                Vibration.vibrate(200);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    const onCancel = () => {
        record = Record.default(); 
        bloodSugarTab.current.refresh(record);
        syncDateTime(true);

        setIsTimeModified(false);
        setIsDateModified(false);
    }


    const syncDateTime = (setSync = false) => {
        if(setSync) {
            setDateTimeSync(true);
        }

        setDateTime(new Date());
    }

    const onDateTimeSelectionOpen = () => {
        setDateTimeSync(false);
    }

    const onDateTimeSelectionCancel = () => {
        if(isDateModified != true && isTimeModified != true) {
            syncDateTime(true);
        }
    }

    const dateSelectionConfirm = (date) => {
        setDateTime(date);
        setIsDateModified(true);
        setDateTimeSync(false);
    };

    const timeSelectionConfirm = (time) => {
        setDateTime(time);
        setIsTimeModified(true);
        setDateTimeSync(false);
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
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
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
                        label={`Datum ${isDateModified ? '' : '(dnes)'}`}
                        onConfirm={dateSelectionConfirm}
                        onOpen={onDateTimeSelectionOpen}
                        onCancel={onDateTimeSelectionCancel}
                        isModified={isDateModified}
                    >
                    </DateTimePickerWithText>
                    <DateTimePickerWithText
                        value={dateTime}
                        mode="time"
                        label={`Čas ${isDateModified || isTimeModified ? '' : '(teď)'}`}
                        onConfirm={timeSelectionConfirm}
                        onOpen={onDateTimeSelectionOpen}
                        onCancel={onDateTimeSelectionCancel}
                        isModified={isTimeModified}
                    >
                    </DateTimePickerWithText>
                </View>
                <View style={styles.controlpanel}>
                    <ButtonSecondary title="Zahodit" onPress={onCancel}></ButtonSecondary>
                    <ButtonPrimary icon="plus" title="Přidat záznam" onPress={onSave}></ButtonPrimary>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
    