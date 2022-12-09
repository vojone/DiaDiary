import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useState } from "react";
import { pressUnderlayColor, primaryColor } from "../styles/common";

export default function DateTimePickerWithText(props) {
    const [isPickerVisible, setPickerVisibility] = useState(false);

    const getDateFormatted = () => {
        let year = props.value.getFullYear();
        let day = props.value.getDate();
        let month = props.value.getMonth();

        return `${day}. ${month}. ${year}`; //Day. Month. Year
    }

    const getTimeFormatted = () => {
        let hours = props.value.getHours();
        let minutes = props.value.getMinutes();

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; //Hours:Minutes
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

    return (
    <View>
        <Text>{props.label}</Text>
        <TouchableHighlight onPress={showPicker} underlayColor={pressUnderlayColor}>
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
                backgroundColor: props.isModified === true ? pressUnderlayColor : 'transparent',
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
                {props.mode == 'time' ? getTimeFormatted() : getDateFormatted()}
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