/**
 * Screen for displaying chart of blood sugar values
 * Author:  Juraj Dedič (xdedic07)
 */

import { Record } from "../models/record";


import { Dimensions, StyleSheet, Text, View, Button } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

import { DefaultTheme } from "react-native-paper";

import { LineChart, AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { func } from "prop-types";
// import { Dots, Line } from '@/screens/AreaChartScreen/chartAdds'

import BottomSheet from '@gorhom/bottom-sheet';

function getDaysBack(date,n = 1){
    let d = new Date(date)
    return new Date(d.setDate(d.getDate()-n))
}

function getDisplayDate(date) {
  if (date == null) {
      return "";
  }
  //check if date is today and if so return time
  let today = new Date();
  if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()){
    return date.getHours() + ":" + date.getMinutes();
  }
  return date.getDate() + "." + (date.getMonth() + 1 + ".");
}


function ChartContainer(){ return <View style={`
  flex-direction: row;
  margin-vertical: ${({ theme }) => theme.spacing.xl}px;
  position: relative;
`}/>
}

// function Demo() {
// 	return 
// }

function Line ({ line }) {
    return <Path key={'line'} d={line} stroke={'#0000BF'} fill={'none'} />
}


function Dots ({ x, y, data }) {
  return (
      <>
          {data?.map((value, index) => (
              <Circle
                  key={index}
                  cx={x(index)}
                  cy={y(value)}
                  r={4}
                  stroke={'rgb(0, 0, 0)'}
                  fill={'white'}
              />
          ))}
      </>
  )
}

function Shadow (props) {
  const { line } = props
  return (
      <Path
          key={'shadow'}
          y={2}
          x={1}
          d={line}
          fill={'none'}
          strokeWidth={4}
          stroke={'rgba(134, 65, 244, 0.2)'}
      />
  )
}

function Gradient() {
  return (<Defs>
      <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
          <Stop offset={'0%'} stopColor={'rgb(103, 23, 145)'} stopOpacity={0.8} />
          <Stop offset={'100%'} stopColor={'rgb(171, 44, 44)'} stopOpacity={0.3} />
      </LinearGradient>
  </Defs>)
}

function getQuery(dateFrom, dateTo){
  let query = {};
  if(dateFrom != null && dateTo != null){
    query = {
        "dateTime": {
            "$gte": dateFrom,
            "$lte": dateTo
        }
    }
  } else if(dateTo != null){
    query = {
        "dateTime": {
            "$lte": dateTo
        }
    }
  } else if(dateFrom != null){
    query = {
        "dateTime": {
            "$gte": dateFrom
        }
    }
  }
  return query;
}

function composeData (valuesArray) {
  return [
      {
          data: valuesArray,
          svg: { strokeWidth: 3, stroke: 'url(#gradient)' },
      },
      {
          data: valuesArray.map(() => 3.9),
          svg: { strokeWidth: 2, strokeDasharray: [8, 16], stroke: 'red' },
      },
      {
          data: valuesArray.map(() => 5.5),
          svg: { strokeWidth: 2, strokeDasharray: [8, 16], stroke: 'red' },
      },
  ]
}

function getMin(data){
  if(!data || data.length == 0){
    return 0;
  }
  let glucose = data.map((item) => item["bloodSugar"]);
  let min = glucose[0];
  for(let i = 1; i < glucose.length; i++){
    if(glucose[i] < min){
      min = glucose[i];
    }
  }
  return min;
}

function getMax(data){
  if(!data || data.length == 0){
    return 1;
  }
  let glucose = data.map((item) => item["bloodSugar"]);
  let max = glucose[0];
  for(let i = 1; i < glucose.length; i++){
    if(glucose[i] > max){
      max = glucose[i];
    }
  }
  return max;
}

export default function ChartScreen({ navigation }) {

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
    hideFromDatePicker();
  };
  const handleToConfirm = (date) => {
    setDateTo(date);
    hideToDatePicker();
  };

  let [data, setData] = useState([])

    const today = new Date();
    let days = [getDaysBack(today,5), getDaysBack(today,4), getDaysBack(today,3), getDaysBack(today,2), getDaysBack(today,1), today]
    let labels = days.map(i => i.getDate() + "." + (i.getMonth() + 1));
    
    let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
    };

  let [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    Record.find(getQuery(dateFrom, dateTo), true).then(result => {
      console.log("query", getQuery(dateFrom, dateTo));
      if(result == null){
        setData([]);
        return;
      }
      let data = result.sort((a, b) => a["dateTime"] - b["dateTime"]);
      setData(data);
      let lastData = data[data.length - 1];
      if(lastData != null){
        setLastUpdate(lastData);
      }
    });
  },[dateFrom, dateTo]);
  
  function getDisplayData(data){
    const dataComposed = composeData(data.map(i => i["bloodSugar"]))
    return dataComposed;
  }

  function getXLabels(data){
    let labels = data.map(i => getDisplayDate(i["dateTime"]));
    console.log("labels", labels);
    return labels;
  }

  console.log("data", data[0]);

  //open the bottom sheet
  const openSheet = () => {
    
  };

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

   const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });
 

    return (
  <View style={{
    backgroundColor: "#5924EB"
  }}>
      <Text style={{
        color: "white",
        fontSize: 30,
        fontWeight: "normal",
        marginTop: 30,
        marginHorizontal: 20,
      }}>Poslední záznam hladiny cukru v krvi: { lastUpdate && lastUpdate["bloodSugarU"] ? lastUpdate["bloodSugar"]+" "+lastUpdate["bloodSugarU"]["label"] : "neznámá" }</Text>
      <Text style={{
        color: "white",
        fontSize: 20,
        fontWeight: "normal",
        marginTop: 10,
        marginHorizontal: 20,
      }}>Aktualizace: { lastUpdate ? getDisplayDate(lastUpdate["dateTime"]) : "neznámo" }</Text>
    <View style={{
      height: "100%",
      backgroundColor: "#f5f5f5",
      marginTop: 20,
      paddingTop: 20,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    }}>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginHorizontal: 20, marginBottom: 10 }}>Záznamy</Text>

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
    
      <View style={{
        backgroundColor: "white",
        borderRadius: 30,
        padding: 20,
        marginHorizontal: 10,
      }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Text 
          style={{
            fontSize: 24,
            marginBottom: 0,
            fontWeight: "bold"
          }}>
            Přehled v grafu
        </Text>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" onPress={optionsClick} />
        </View>
        <View style={{
          flexDirection: "row",
          marginVertical: 10,
          position: "relative",
          height: 210,
          }}>
          <YAxis
            data={data}
            contentInset={{ top: 20, bottom: 20 }}
            min={getMin(data)}
            max={getMax(data)}
            svg={{
              fill: 'grey',
              fontSize: 11,
            }}
            style={{ marginRight: 0 }}
            formatLabel={(value) => `${value} mmol/L`}
            numberOfTicks={6}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ width: "100%", height: "100%" }}
              data={getDisplayData(data)}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveNatural}
              // svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
              svg={{
                stroke: 'url(#gradient)',
              }}
            >
              <Line/>
              <Dots/>
              <Gradient/>
              <Shadow/>
              <Grid/>
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={data}
              formatLabel={(value, index) => {
                if (index % 4 === 0) {
                  console.log("value", value, "index", index);
                  let date = new Date(data[index]["dateTime"]);
                  return getDisplayDate(date)
                }
                return ''
              }}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        </View>
      </View>

      <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginHorizontal: 10, marginBottom: 10 }}>Seznam záznamů</Text>
        <MaterialCommunityIcons name="arrow-right" size={24} color="black" onPress={() => navigation.navigate("Historie")} />
      </View>
    </View>

    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      <View style={styles.contentContainer}>
        <Text style={{marginBottom: 10}}>Nastavení grafu 🎉</Text>

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

      </View>
    </BottomSheet>
  </View>
    )
}