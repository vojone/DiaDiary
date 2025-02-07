/**
 * Screen for adding record (consists from BloodSugarTab, FoodTab, OtherTab)
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { StyleSheet, View, Vibration, Keyboard, Dimensions, Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Record } from '../models/record';
import { useState, useRef, useEffect, useLayoutEffect, useReducer } from 'react';
import BloodSugarTab from './BloodSugarTab';
import FoodTab from './FoodTab';
import OtherTab from './OtherTab';
import { backgroundColor, bottomBarHeight, headerHeight, primaryColor, successColor, topBarHeight, warningColor } from '../styles/common';
import DateTimePickerWithText from '../components/DateTimePickerWithText';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showToastMessage, showToastMessageDanger, showToastMessageSuccess, showToastMessageWarning } from '../components/ToastMessage';
import { User } from '../models/user';


const debuggingMode = false;

export default function RecordAddScreen({ navigation }) {
    //const [record, setRecord] = useState(Record.default());
    let record = Record.default();
    const content = useRef();
    const bloodSugarTab = useRef();
    const foodTab = useRef();
    const otherTab = useRef();

    const [dateTime, setDateTime] = useState(record.dateTime);
    const [isDateModified, setIsDateModified] = useState(false);
    const [isTimeModified, setIsTimeModified] = useState(false);
    const [isDateTimeSync, setDateTimeSync] = useState(true);
    const [saving, setSaving] = useState(false);

    //Force update due to official FAQ: https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    const [_, forceRefresh] = useReducer(x => ++x, 0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            forceRefresh();
        });

        return unsubscribe;
    }, [navigation]);

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

    //Callback for saving button
    const onSave = () => {
        setSaving(true);

        record.setProperties({dateTime: dateTime});
        record.setProperties(bloodSugarTab.current.getData());
        record.setProperties(foodTab.current.getData());
        record.setProperties(otherTab.current.getData());

        record.save().then(
            (newRec) => {
                record = Record.default();
                bloodSugarTab.current.refresh(record);
                foodTab.current.refresh(record);
                otherTab.current.refresh(record);

                syncDateTime(true);

                setIsTimeModified(false);
                setIsDateModified(false);

                Vibration.vibrate(200);

                setSaving(false);

                showToastMessageSuccess('Záznam byl uložen');
            },
            (error) => {
                console.error(error);
                showToastMessageDanger('Při ukládání záznamu došlo k chybě');
            });
    }

    //Cancel button click
    const onCancel = () => {
        record = Record.default(); 
        bloodSugarTab.current.refresh(record);
        foodTab.current.refresh(record);
        otherTab.current.refresh(record);
        syncDateTime(true);

        setIsTimeModified(false);
        setIsDateModified(false);

        showToastMessageWarning('Záznam byl zahozen');
    }

    //Syncing the date time
    const syncDateTime = (setSync = false) => {
        if(setSync) {
            setDateTimeSync(true);
        }

        setDateTime(new Date());
    }

    //Unsync date time when is date time selection opened
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

    //Debugging function for printing all records to log
    const onDump = () => {
        Record.find({}, true).then((result) => { 
            console.log(result);
        });
    }

    //Debugging function for clearing records
    const onClear = () => {
        Record.remove({}, true).then((removedNum) => {
            console.log(`Removed ${removedNum} records!`);
        });
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
            flex: 1,
            minHeight: Dimensions.get('window').height - bottomBarHeight - topBarHeight,
        },

        timeinputcontainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            marginTop: '-100%',
        },
    
        rightaligned: {
            textAlign: 'right',
        },
    });

    const [verticalScrollEnabled, setVerticalScrollEnabled] = useState(false);

    Keyboard.addListener('keyboardDidShow', () => {
        setVerticalScrollEnabled(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
        setVerticalScrollEnabled(false);
    })
    
    return (
        <KeyboardAwareScrollView scrollEnabled={verticalScrollEnabled}>
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
                            tabBarStyle: {
                                height: topBarHeight,
                            },
                            swipeEnabled: global.user ? (global.user.inputType != 1) : true,
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
                            tabBarStyle: {
                                height: topBarHeight,
                            },
                            swipeEnabled: global.user ? (global.user.inputType != 1) : true,
                        }}
                    >
                        {props => <FoodTab {...props} model={record} screenref={foodTab}></FoodTab>}
                    </Tab.Screen>
                    <Tab.Screen
                        name="other"
                        options={{
                            tabBarLabel: 'Ostatní',
                            tabBarLabelStyle: {
                                textTransform: 'capitalize',
                            },
                            tabBarIndicatorStyle: StyleSheet.create({
                                borderTopColor: primaryColor,
                                borderTopWidth: 3,
                            }),
                            tabBarStyle: {
                                height: topBarHeight,
                            },
                            swipeEnabled: global.user ? (global.user.inputType != 1) : true,
                        }}
                    >
                        {props => <OtherTab {...props} model={record} screenref={otherTab}></OtherTab>}
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
                <ButtonPrimary 
                    icon="plus" 
                    title="Přidat záznam" 
                    loading={saving} 
                    disabled={saving} 
                    onPress={onSave}
                    fillColor={primaryColor}
                    textColor="white"
                >
                </ButtonPrimary>
            </View>

            { debuggingMode &&
            <View style={styles.controlpanel}>
                <ButtonSecondary title="Záznamy" onPress={onDump}></ButtonSecondary>
                <ButtonSecondary title="Vyčistit" onPress={onClear}></ButtonSecondary>
            </View>
            }
        </View>
        </KeyboardAwareScrollView>
    );
}
    