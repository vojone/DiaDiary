import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react'

import { List } from 'react-native-paper';

import { Record } from '../models/record';
import HistoryItem from '../components/HistoryItem';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import Accordion from 'react-native-collapsible/Accordion';
import { getRelativeCoords } from 'react-native-reanimated';


function getDisplayDate(date) {
    if (date == null) {
        return "";
    }
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}

function getRecords(records, dateFrom, dateTo){
    return records.filter(i => (i.date > dateFrom || dateFrom === null) && (i.date > dateTo || dateTo === null))
}

export default function HistoryScreen({ navigation }) {
    let records = [
            {id: 0, bloodSugar: 100, insulineTaken: 2, date: new Date()},
            {id: 1, bloodSugar: 200, insulineTaken: 1, date: new Date()},
            {id: 2, bloodSugar: 120, insulineTaken: 3, date: new Date()},
            {id: 3, bloodSugar: 50, insulineTaken: 2, date: new Date()},
    ];

    //create new record
    // let record = new Record({bloodSugar: 100, insulineTaken: 2});
    // record.save().then(result => {
    //     console.log("record saved", result);
    // });

    Record.find({}, true).then(result => {
        let records1 = result;
        console.log("history",records1);
    });

    //load records from storage
    let i = 0;
    let cont = true;

    const styles = StyleSheet.create({
        
    });
    
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const [isCollapsed, setIsCollapsed] = useState(true);

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
        console.warn("A date has been picked: ", dateFrom);
        hideFromDatePicker();
    };
    const handleToConfirm = (date) => {
        setDateTo(date);
        console.warn("A date has been picked: ", dateTo);
        hideToDatePicker();
    };

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{textAlign: "left", width: "100%", padding: 20, fontSize: 30, fontWeight: "bold"}}>Historie záznamů</Text>

        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 10}}>
            <Text>Datum od: {getDisplayDate(dateFrom)}</Text>
            <View style={{flexDirection: "row"}}>
                <Button title="Změnit" onPress={showFromDatePicker} />
                <Button onPress={ () => {setDateFrom(null)}} title="zrušit"/>
            </View>
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 10}}>
            <Text>Datum do: {getDisplayDate(dateTo)}</Text>
            <View style={{flexDirection: "row"}}>
                <Button title="Změnit" onPress={showToDatePicker} />
                <Button onPress={ () => {setDateTo(null)}} title="zrušit"/>
            </View>
        </View>


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
        
        
        <FlatList data={getRecords(records, dateFrom, dateTo)} renderItem={({item}) => <HistoryItem key={item.id} record={item} onPress={() => {navigation.navigate('EntryDetail'); console.log('hi');}}></HistoryItem>} />
    </View>
    );
}