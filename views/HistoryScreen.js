import { StyleSheet, Text, View, Button, TextInput, FlatList, RefreshControl, ScrollView, SectionList, VirtualizedList } from 'react-native';
import React, { useState, useEffect } from 'react'

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
    // return records;
    let recordsFiltered = records.filter(i => (i["dateTime"] > dateFrom || dateFrom === null) && (i["dateTime"] < dateTo || dateTo === null))
    return recordsFiltered.sort((a,b) => b["dateTime"] - a["dateTime"]);
}

export default function HistoryScreen({ navigation }) {
    // let records = [
    //         {id: 0, carboHydrates: 100, insuline: 2, dateTime: new Date()},
    //         {id: 1, carboHydrates: 200, insuline: 1, dateTime: new Date()},
    //         {id: 2, carboHydrates: 120, insuline: 3, dateTime: new Date()},
    //         {id: 3, carboHydrates: 50, insuline: 2, dateTime: new Date()},
    // ];
    let [records, setRecords] = useState([]);

    //load records from storage
    let i = 0;
    let cont = true;

    const styles = StyleSheet.create({
        
    });

    const [refreshing, setRefreshing] = useState(false);
    
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
        hideFromDatePicker();
    };
    const handleToConfirm = (date) => {
        setDateTo(date);
        hideToDatePicker();
    };

    const loadRecords = () => {
        
        Record.find({}, true).then(result => {
            setRecords(result);
            // console.log("history",result);
        });
    }

    // loadRecords();
    const doRefresh = async () => {
        setRefreshing(true);
        loadRecords();    
        setRefreshing(false);
    }

    const onRefresh = React.useCallback(doRefresh, [refreshing]);

    useEffect(() => {
        //causes infinite loop
        loadRecords();
        console.log("useEffect");
    }, []);

    return (
    <ScrollView style={{flex: 1}}
    contentContainerStyle={styles.scrollView}
    refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
    }
    >
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

        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingLeft: 30, paddingRight: 30, paddingBottom: 10, paddingTop: 20}}>
            <Text style={{fontSize: 18, }}>Cukr</Text>
            <Text style={{fontSize: 18, }}>Inzulín</Text>
            <Text style={{fontSize: 18, }}>Datum</Text>
        </View>


        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 10}}>
            <FlatList
            style={{width: "100%"}}
            data={getRecords(records, dateFrom, dateTo)}
            renderItem={({item}) => 
                <HistoryItem 
                key={item["_id"]} record={item} 
                onPress={() => {navigation.navigate('EntryDetail', {
                    recordId: item["_id"],
                })}}>

                </HistoryItem>
            } />
        </View>
    </ScrollView>
    );
}