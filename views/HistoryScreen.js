/**
 * Screen for displaying history of records
 * @author Juraj Dedič (xdedic07)
 */

import { StyleSheet, Text, View, TextInput, FlatList, RefreshControl, ScrollView, SectionList, VirtualizedList, Dimensions, TouchableHighlight } from 'react-native';
import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react'

import ChooseDateRange from '../components/ChooseDateRange';

import { List } from 'react-native-paper';

import { Record } from '../models/record';
import HistoryItem from '../components/HistoryItem';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet from '@gorhom/bottom-sheet';

import { MultiSelect } from "react-native-element-dropdown";
import { pressUnderlayColor, primaryColor } from "../styles/common";
import { Tag } from "../models/tag";
import DropdownItem from "../components/DropdownItem";

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
    }, []);

    //Force update due to official FAQ: https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    const [_, forceRefresh] = useReducer(x => ++x, 0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            doRefresh();
            forceRefresh();
        });
        return unsubscribe;
    }, [navigation]);

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['40%', '45%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {}, []);

    function optionsClick(){
        bottomSheetRef.current.expand();
    }

    useEffect(() => {
        bottomSheetRef.current.close();
    }, []);


    const [tags, setTags] = useState(/*model.tags*/[]);
    const [tagsEnum, setTagsEnum] = useState([]);

    useEffect(() => {
        Tag.find({}, true).then((tags) => {
            if(tags == null) {
                setTagsEnum([]);
            }
            else {
                setTagsEnum(tags);
            }
        })
    }, []);

    return (
    <View style={{flex: 1, height: "100%"}}>
    <View style={{flex: 1, height: "100%"}}
    contentContainerStyle={styles.scrollView}
    refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
    }
    >
        <View style={{justifyContent: "space-between", flexDirection: "row", alignItems: "center", width: "100%", padding: 20}}>
            <Text style={{textAlign: "left", fontSize: 30, fontWeight: "bold"}}>Historie záznamů</Text>
            <TouchableHighlight
                activeOpacity={0.5}
                style={{borderRadius: 4}}
                underlayColor='lightgray'
                onPress={optionsClick}
            >
                <View>
                    <MaterialCommunityIcons name="dots-vertical" size={28} color="black"/>
                </View>
            </TouchableHighlight>
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingLeft: 30, paddingRight: 30, paddingBottom: 10, paddingTop: 20}}>
            <Text style={{fontSize: 18, }}>Cukr</Text>
            <Text style={{fontSize: 18, }}>Inzulín</Text>
            <Text style={{fontSize: 18, }}>Datum</Text>
        </View>


        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 10}}>
            <FlatList
            style={{width: "100%", height: Dimensions.get('window').height - 250}}
            scrollEnabled={true}
            data={getRecords(records, dateFrom, dateTo)}
            renderItem={({item}) => 
                <HistoryItem 
                key={item["_id"]} record={item} 
                onPress={() => {
                    navigation.navigate('EntryDetail', {
                        recordId: item["_id"],
                    })
                }}>

                </HistoryItem>
            } />
        </View>
    </View>

    <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        style={{
            position: "absolute",
        }}>
        <View style={{paddingHorizontal: 24}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Filtrování a řazení 🎉</Text>

            <ChooseDateRange onChange={(val) => {setDateFrom(val.dateFrom); setDateTo(val.dateTo);}} />

            <Text style={{marginBottom: 10}}>Tagy:</Text>
            <MultiSelect
                data={tagsEnum}
                value={tags}
                labelField="label"
                valueField="_id"
                onChange={setTags}
                onChangeText={() => {}}
                search={false}
                placeholder='Vybrat ze seznamu'
                style={{borderColor: primaryColor, borderWidth: 1, borderRadius: 4, paddingHorizontal: 15, paddingVertical: 10}}
                selectedStyle={{backgroundColor: primaryColor, borderRadius: 100}}
                renderItem={(item, selected) => <DropdownItem item={item} selected={selected} padding={20} withIcon={true}></DropdownItem>}
                selectedTextStyle={{color: 'white'}}
                containerStyle={{top: -25}}
            >
            </MultiSelect>
        </View>
        </BottomSheet>
    </View>
    );
}