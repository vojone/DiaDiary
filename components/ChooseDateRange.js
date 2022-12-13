/**
 * Component for choosing date range
 * @author Juraj Dedič (xdedic07)
 */

import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import {  Text } from "react-native";
import { Button } from 'react-native-paper';

function getDisplayDate(date) {
    if (date == null) {
        return "";
    }
    //check if date is today and if so return time
    let today = new Date();
    if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()){
      return "Dnes";
    }
    //check if date is yesterday and if so return "včera"
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.getDate() == yesterday.getDate() && date.getMonth() == yesterday.getMonth() && date.getFullYear() == yesterday.getFullYear()){
      return "Včera";
    }
    return date.getDate() + "." + (date.getMonth() + 1 + ".");
}

export default function ChooseDateRange(props) {

    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

    const showFromDatePicker = () => {
        setFromDatePickerVisibility(true);
    };
    const showToDatePicker = () => {
        setToDatePickerVisibility(true);
    };

    const hideFromDatePicker = () => {
        setFromDatePickerVisibility(false);
    };
    const hideToDatePicker = () => {
        setToDatePickerVisibility(false);
    };

    const handleFromConfirm = (date) => {
        setDateFrom(date);
        if(props.onChange){
            props.onChange({dateFrom: date, dateTo});
        }
        hideFromDatePicker();
    };
    const handleToConfirm = (date) => {
        setDateTo(date);
        if(props.onChange){
            props.onChange({dateFrom, dateTo: date});
        }
        hideToDatePicker();
    };

    const { startDate, endDate, onStartDateChange, onEndDateChange } = props;
    return (
    <View style={{width: "100%"}}>

        <DateTimePickerModal
            isVisible={isFromDatePickerVisible}
            mode="date"
            onConfirm={handleFromConfirm}
            onCancel={hideFromDatePicker}
        />

        <DateTimePickerModal
            isVisible={isToDatePickerVisible}
            mode="date"
            onConfirm={handleToConfirm}
            onCancel={hideToDatePicker}
        />

        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingBottom: 10}}>
            <Text>Datum od: {getDisplayDate(dateFrom)}</Text>
            <View style={{flexDirection: "row"}}>
                <Button onPress={showFromDatePicker} mode="contained">Změnit</Button>
                <Button onPress={ () => {handleFromConfirm(null)}}>Zrušit</Button>
            </View>
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingBottom: 10}}>
            <Text>Datum do: {getDisplayDate(dateTo)}</Text>
            <View style={{flexDirection: "row"}}>
                <Button onPress={showToDatePicker} mode="contained">Změnit</Button>
                <Button onPress={ () => {handleToConfirm(null)}}>Zrušit</Button>
            </View>
        </View>
    </View>
  );
}