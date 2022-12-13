/**
 * Component for displaying one record in history
 * Author:  Juraj Dedič (xdedic07)
 */

import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { color } from "react-native-reanimated";

function isToday(date) {
    if(!date) return false;

    const today = new Date();
  
    // 👇️ Today's date
    console.log(today);
  
    if (today.toDateString() === date.toDateString()) {
      return true;
    }
  
    return false;
}

function getDisplayDate(date) {
    if (date == null) {
        return "";
    }
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}

export default function HistoryItem(props) {

    const record = props.record || {bloodSugar: 0, insulineTaken: 0};

    const dateTime = record["dateTime"];

    const styles = StyleSheet.create({
        text: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: 10,
            padding: 10,
            marginTop: 4,
            marginBottom: 4,
            width: "100%",
        },
        sugar:{
            flex: 1,
            fontSize: 16
            // color: 'black',
            // width: 20,
            // marginRight: 10,
        },
        insuline:{
            flex: 1,
            fontSize: 16,
            color: record["insuline"] ? 'black' : 'grey',
            // color: 'black',
            // width: 50,
            // marginLeft: 10,
        },
    });

    return (
        <TouchableWithoutFeedback  onPress={props.onPress}>
            <View style={styles.text}>
                <Text style={styles.sugar}>
                     {record["bloodSugar"]} {record["bloodSugarU"]["label"]}
                </Text> 
                <Text style={styles.insuline}>
                     {record["insuline"] || "Nezadáno"} {record["insuline"] ? record["insulineT"]["label"] : ""}
                </Text>
                <Text>
                     {isToday(dateTime) ? dateTime.toLocaleTimeString() : getDisplayDate(dateTime)}
                </Text>
            </View>
        </TouchableWithoutFeedback >
    );
}