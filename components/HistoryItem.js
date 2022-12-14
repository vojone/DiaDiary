/**
 * Component for displaying one record in history
 * @author Juraj Dedič (xdedic07)
 */

import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import { color } from "react-native-reanimated";
import { backgroundColor, pressUnderlayColor } from "../styles/common";

function isToday(date) {
    if(!date) return false;

    const today = new Date();
  
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
            paddingVertical: 25,
            marginTop: 4,
            marginBottom: 4,
            width: "100%",
            shadowColor: "#888",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 3.84,

            elevation: 5,
            },

        container: {
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            justifyContent: 'space-between',
            flexDirection: 'row',
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
        <TouchableHighlight 
            style={styles.text} 
            onPress={props.onPress}
            underlayColor={backgroundColor}
        >
            <View  style={styles.container}>
                <Text style={styles.sugar}>
                     {record["bloodSugar"] || "Nezadáno"} {record["bloodSugar"] ? record["bloodSugarU"]["label"] : " "}
                </Text> 
                <Text style={styles.insuline}>
                     {record["insuline"] || "Nezadáno"} {record["insuline"] ? record["insulineT"]["label"] : ""}
                </Text>
                <Text>
                     {isToday(dateTime) ? dateTime.toLocaleTimeString() : getDisplayDate(dateTime)}
                </Text>
            </View>
        </TouchableHighlight >
    );
}