/**
 * Datetime picker with data visualisation (base on react-native-modal-datetime-picker)
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useState } from "react";
import { modifiedColor, pressUnderlayColor, primaryColor } from "../styles/common";

export default function DateTimePickerWithText(props) {
    const [isPickerVisible, setPickerVisibility] = useState(false);

    const getDateFormatted = () => {
        let year = props.value.getFullYear();
        let day = props.value.getDate();
        let month = props.value.getMonth() + 1; //January is 0 so +1

        return `${day}. ${month}. ${year}`; //Day. Month. Year
    }

    const getTimeFormatted = () => {
        let hours = props.value.getHours();
        let minutes = props.value.getMinutes();

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; //Hours:Minutes
    }

    const getDateTimeFormatted = () => {
        return `${getDateFormatted()} ${getTimeFormatted()}`;
    }

    const showPicker = () => {
        setPickerVisibility(true);

        if(props.onOpen) {
            props.onOpen();
        }
    }

    const hidePicker = () => {
        setPickerVisibility(false);
    }

    const selectionCanceled = () => {
        hidePicker();

        if(props.onCancel) {
            props.onCancel();
        }
    }

    const selectionConfirmed = (value) => {
        hidePicker();

        if(props.onConfirm) {
            props.onConfirm(value);
        }
    }

    const getContent = () => {
        if(props.mode == 'time') {
            return getTimeFormatted();
        }
        else if(props.mode == 'date') {
            return getDateFormatted();
        }
        else {
            return getDateTimeFormatted();
        }
    }

    return (
    <View>
        <Text>{props.label}</Text>
        <TouchableHighlight onPress={showPicker} style={{borderRadius: 4}} underlayColor={pressUnderlayColor}>
        <View 
            style={StyleSheet.create({
                borderBottomColor: primaryColor,
                borderTopColor: primaryColor,
                borderLeftColor: primaryColor,
                borderRightColor: primaryColor,
                borderWidth: 1,
                padding: 15,
                borderRadius: 4,
                fontSize: 20,
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: props.isModified === true ? modifiedColor : 'transparent',
            })}
        >
            <AntDesign 
                name={props.mode == 'time' ? "clockcircleo" : "calendar"} 
                size={20} 
                color={primaryColor} 
                style={StyleSheet.create({ marginRight: 10, position: 'relative', top: 4 })}>    
            </AntDesign>
            <Text
                style={StyleSheet.create({
                    fontSize: 20,
                })}
            >
                {getContent()}
            </Text>
        </View>
        </TouchableHighlight>
        <DateTimePicker 
            style={StyleSheet.create({ backgroundColor: primaryColor })}
            date={props.value}
            mode={props.mode}
            isVisible={isPickerVisible}
            onCancel={selectionCanceled}
            onConfirm={selectionConfirmed}
        >
        </DateTimePicker>
    </View>
    );
};