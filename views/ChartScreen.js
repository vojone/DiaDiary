/**
 * Screen for displaying chart of blood sugar values
 * @author Juraj Dedič (xdedic07)
 */

import { Record } from "../models/record";


import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect, useRef, useReducer, useMemo, useCallback } from "react";

import { LineChart, AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'

import BottomSheet from '@gorhom/bottom-sheet';
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import ChooseDateRange from "../components/ChooseDateRange";

import { User } from "../models/user";

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
    return String(date.getHours()).padStart(2,'0') + ":" + String(date.getMinutes()).padStart(2,'0');
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
          <Stop offset={'0%'} stopColor={'rgb(89, 36, 235)'} stopOpacity={0.8} />
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

function convertToUnit(data, unitObject){
  let convertedData = data.map((item) => {
    if(item["bloodSugarU"]["label"] != unitObject["label"]){
      let coefficient = item["bloodSugarU"]["toReferenceCoef"];
      return {
        ...item,
        "bloodSugar": item["bloodSugar"] * coefficient,
        "bloodSugarU": unitObject
      }
    }
    return item;
  });
  return convertedData;
}

function composeData (data, unitLabel) {
  // let valuesArray = data.map((item) => {
  //   if(item["bloodSugarU"]["label"] != unitLabel){
  //     let coefficient = item["bloodSugarU"]["toReferenceCoef"];
  //     return item["bloodSugar"] * coefficient;
  //   }
  //   return item["bloodSugar"]
  // });
  let valuesArray = data.map((item) => item["bloodSugar"]);
  return [
      {
          data: valuesArray,
          svg: { strokeWidth: 3, stroke: 'url(#gradient)' },
      },
      {
          data: valuesArray.map(() => 3.9),
          svg: { strokeWidth: 2, strokeDasharray: [12, 16], stroke: '#C80000' },
      },
      {
          data: valuesArray.map(() => 5.5),
          svg: { strokeWidth: 2, strokeDasharray: [12, 16], stroke: '#C80000' },
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

  const [user, setUser] = useState(null);

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

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

  function doRefresh(){
    Record.find(getQuery(dateFrom, dateTo), true).then(result => {
      // console.log("query", getQuery(dateFrom, dateTo));
      if(result == null){
        setData([]);
        return;
      }
      let data = result.sort((a, b) => a["dateTime"] - b["dateTime"]);

      let filtrated = data.filter(d => d["bloodSugar"]);
      setData(filtrated);
      let lastData = filtrated[filtrated.length - 1];
      if(lastData != null){
        setLastUpdate(lastData);
      }
    });

    User.find({}).then((user) => {
      console.log("user",user);
      setUser(user);
    });
  }

  useEffect(() => {
    doRefresh();
  },[dateFrom, dateTo]);

  //Force update due to official FAQ: https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
  const [_, forceRefresh] = useReducer(x => ++x, 0);

  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
          doRefresh();
          forceRefresh();
      });
      return unsubscribe;
  }, [navigation]);
  
  function getDisplayData(data){
    const dataComposed = composeData(data, getDefaultUnit())
    return dataComposed;
  }

  function getXLabels(data){
    let labels = data.map(i => getDisplayDate(i["dateTime"]));
    return labels;
  }

  function generateEmoji(){
    if( data== null || data.length == 0)
      return "😀";
    let emoji = "😀";
    let glucose = data[data.length - 1]["bloodSugar"];
    if(glucose < 3.9){
      emoji = "😔";
    } else if(glucose > 5.5){
      emoji = "😡";
    }
    return emoji;
  }

  function getDefaultUnit(){
    if(user == null){
      return "mmol/L";
    }
    return user["glycemiaUnit"]["label"] || "mmol/L";
  }

  // console.log("data", data[0]);

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
      paddingHorizontal: 24,
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
        fontWeight: "300",
      }}>Poslední záznam hladiny cukru v krvi: &nbsp;
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "white", marginHorizontal: 20 }}>
       { lastUpdate && lastUpdate["bloodSugarU"] ? lastUpdate["bloodSugar"] : "neznámá" } &nbsp;
      </Text>
      { lastUpdate && lastUpdate["bloodSugarU"] ? lastUpdate["bloodSugarU"]["label"] : "" }
      &nbsp; {generateEmoji()}
      </Text>
      
      <Text style={{
        color: "white",
        fontSize: 20,
        fontWeight: "300",
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
    
      <View style={{
        backgroundColor: "white",
        borderRadius: 30,
        padding: 20,
        marginHorizontal: 10,
        shadowColor: "grey",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6.27,
        elevation: 4,
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

        <TouchableHighlight
                style={{borderRadius: 4, elevation: 0}}
                underlayColor='#dddddd'
                onPress={optionsClick}
            >
                <View>
                    <MaterialCommunityIcons name="dots-vertical" size={28} color="black"/>
                </View>
        </TouchableHighlight>


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
            formatLabel={(value) => `${value} ${getDefaultUnit()}`}
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

      <TouchableWithoutFeedback 
      style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginTop: 20 }}
      onPress={() => navigation.navigate("Historie")}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginHorizontal: 10, marginBottom: 10 }}>Seznam záznamů</Text>
        <MaterialCommunityIcons name="arrow-right" size={24} color="black" style={{marginHorizontal: 10}}/>
      </TouchableWithoutFeedback>
    </View>

    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      style={{
      }}>
      <View style={styles.contentContainer}>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Nastavení grafu 🎉</Text>

        <ChooseDateRange onChange={(val) => {setDateFrom(val.dateFrom); setDateTo(val.dateTo);}} />

      </View>
    </BottomSheet>
  </View>
    )
}