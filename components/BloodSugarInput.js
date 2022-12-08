import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';


export default function BloodSugarInput() {
    const [dateTime, setDateTime] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const shiftZeros = (str) => {
        while(str.charAt(0) === '0')
            str = str.substring(1);
            
        return str;
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


    const styles = StyleSheet.create({
        maincontainer: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',

            padding: 20,
        },

        inputcontainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
        },

        timeinputcontainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        rightaligned: {
            textAlign: 'right',
        }
    });


    return (
        <View style={styles.maincontainer}>
            <View>
                <Text>Hladina cukru</Text>
                <View style={styles.inputcontainer}>
                <Button
                    title="-"
                ></Button>
                <TextInput
                    placeholder='Glykémie'
                ></TextInput>
                <Button
                    title="+"
                ></Button>
                </View>
            </View>
            {/* <View>
                <Text>5.5</Text>
            </View> */}
            <View>
                <Text>Podaný inzulín</Text>
                <View style={styles.inputcontainer}>
                <Button
                    title="-"
                ></Button>
                <TextInput
                    placeholder='Glykémie'
                ></TextInput>
                <Button
                    title="+"
                ></Button>
                </View>
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
        </View>);
}