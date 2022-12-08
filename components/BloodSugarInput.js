import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatOneDecimal } from '../utils';
import { addRecordStyles } from '../styles/common';

const GLYCEMIA_STEP = 0.1;
const GLYCEMIA_INIT = 5.5;

const INSULINE_STEP = 1;
const INSULINE_INIT = NaN;

export default function BloodSugarInput() {
    const [glycemia, setGlycemia] = useState(GLYCEMIA_INIT);
    const [glycemiaInput, setGlycemiaInput] = useState(glycemia.toFixed(1));

    const [insuline, setInsuline] = useState(INSULINE_INIT);
    const [insulineInput, setInsulineInput] = useState('');

    const [dateTime, setDateTime] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const shiftZeros = (str) => {
        while(str.charAt(0) === '0')
            str = str.substring(1);
            
        return str;
    }

    const glycemiaChanged = text => {
        if(text.match(/^([1-9]?\d?[,.]\d?|[1-9]?\d?)$/) == null) {
            return;
        }

        setGlycemiaInput(text.replace('.', ','));

        let newGlycVal = parseFloat(text.replace(',', '.'));
        setGlycemia(newGlycVal);
    }

    const glycemiaInc = () => {
        let newGlycVal = glycemia + GLYCEMIA_STEP;
        setGlycemia(newGlycVal);
        setGlycemiaInput(formatOneDecimal(newGlycVal));
    }

    const glycemiaDec = () => {
        let newGlycVal = glycemia - GLYCEMIA_STEP;
        setGlycemia(newGlycVal);
        setGlycemiaInput(formatOneDecimal(newGlycVal));
    }

    const insulineChanged = text => {
        if(text.match(/^\d*$/) == null) {
            return;
        }

        setInsulineInput(text);

        let newInsulineVal = parseInt(text);
        setInsuline(newInsulineVal);
    }

    const insulineInc = () => {
        let newInsulineVal = insuline + INSULINE_STEP;
        setInsuline(newInsulineVal);
        setInsulineInput(newInsulineVal.toString());
    }

    const insulineDec = () => {
        let newInsulineVal = insuline - INSULINE_STEP;
        setInsuline(newInsulineVal);
        setInsulineInput(newInsulineVal.toString());
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

    const styles = addRecordStyles;
    return (
        <View style={styles.maincontainer}>
            <View>
                <Text>Hladina cukru</Text>
                <View style={styles.inputcontainer}>
                <Button
                    title="-"
                    onPress={glycemiaDec}
                ></Button>
                <TextInput
                    value={glycemiaInput}
                    onChangeText={glycemiaChanged}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="Nezadáno"
                ></TextInput>
                <Button
                    title="+"
                    onPress={glycemiaInc}
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
                    onPress={insulineDec}
                ></Button>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Nezadáno"
                    value={insulineInput}
                    onChangeText={insulineChanged}
                ></TextInput>
                <Button
                    title="+"
                    onPress={insulineInc}
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