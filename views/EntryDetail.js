import { StyleSheet, View, Vibration, Keyboard, Dimensions} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Record } from '../models/record';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import EntryDetailBSTab from './EntryDetailBSTab';
import EntryDetailFTab from './EntryDetailFTab';
import EntryDetailOtherTab from './EntryDetailOtherTab';
import { bottomBarHeight, headerHeight, primaryColor, successColor, topBarHeight, warningColor } from '../styles/common';
import DateTimePickerWithText from '../components/DateTimePickerWithText';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showToastMessage } from '../components/ToastMessage';


export default function EntryDetail({ route, navigation }) {

  const {recordId} = route.params;

  const [recordDetail, setRecordDetail] = useState({});

  useEffect(() => {
    Record.findById(recordId).then((record) => {setRecordDetail(record);});
  }, []);

    //const [record, setRecord] = useState(Record.default());
    
    const bloodSugarTab = useRef();
    const foodTab = useRef();
    const otherTab = useRef();

    const [dateTime, setDateTime] = useState(recordDetail.dateTime);
    const [isDateModified, setIsDateModified] = useState(false);
    const [isTimeModified, setIsTimeModified] = useState(false);
    const [isDateTimeSync, setDateTimeSync] = useState(true);

    
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

    //console.log(recordDetail);

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
            minHeight: Dimensions.get('screen').height - bottomBarHeight - topBarHeight - headerHeight,
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
        <KeyboardAwareScrollView>
        <View style={styles.maincontainer}>
            {
                recordDetail.bloodSugar &&
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
                            }
                        }}
                    >
                        {props => <EntryDetailBSTab {...props} model={recordDetail} screenref={bloodSugarTab}></EntryDetailBSTab>}
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
                            }
                        }}
                    >
                        {props => <EntryDetailFTab {...props} model={recordDetail} screenref={foodTab}></EntryDetailFTab>}
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
                            }
                        }}
                    >
                        {props => <EntryDetailOtherTab {...props} model={recordDetail} screenref={otherTab}></EntryDetailOtherTab>}
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
            }
            {
                recordDetail.dateTime &&
            <View style={styles.timeinputcontainer}>
                <DateTimePickerWithText
                    value={recordDetail.dateTime}
                    mode="date"
                    label={`Datum`}
                    onConfirm={dateSelectionConfirm}
                    onOpen={onDateTimeSelectionOpen}
                    onCancel={onDateTimeSelectionCancel}
                    isModified={isDateModified}
                >
                </DateTimePickerWithText>
                <DateTimePickerWithText
                    value={recordDetail.dateTime}
                    mode="time"
                    label={`Čas`}
                    onConfirm={timeSelectionConfirm}
                    onOpen={onDateTimeSelectionOpen}
                    onCancel={onDateTimeSelectionCancel}
                    isModified={isTimeModified}
                >
                </DateTimePickerWithText>
            </View>
            }
            <View style={styles.controlpanel}>
                
                <ButtonPrimary icon="check" title="Uložit změny"  ></ButtonPrimary>
                <ButtonPrimary title="Zrušit změny" icon="close" mode="contained" onPress={() => navigation.navigate('History')}></ButtonPrimary>
            </View>
        </View>
        </KeyboardAwareScrollView>
    );
}
    