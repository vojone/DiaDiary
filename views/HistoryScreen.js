import { StyleSheet, Text, View, Button, TextInput, FlatList, RefreshControl, ScrollView, SectionList, VirtualizedList } from 'react-native';
import React, { useState, useEffect } from 'react'

import ChooseDateRange from '../components/ChooseDateRange';

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
    if(records == null)
        return [];
    let recordsFiltered = records.filter(i => (i["dateTime"] > dateFrom || dateFrom === null) && (i["dateTime"] < dateTo || dateTo === null))
    return recordsFiltered.sort((a,b) => b["dateTime"] - a["dateTime"]);
}

export default function HistoryScreen({ navigation }) {

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

        <ChooseDateRange onChange={(val) => {setDateFrom(val.dateFrom); setDateTo(val.dateTo);}} />

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