import { View, Text, StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useState } from "react";
import { primaryColor } from "../styles/common";

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
    }

    const hidePicker = () => {
        setPickerVisibility(false);
    }

    const selectionCanceled = () => {
        if(props.onCancel) {
            props.onCancel();
        }

        hidePicker();
    }

    const selectionConfirmed = (value) => {
        if(props.onConfirm) {
            props.onConfirm(value);
        }

        hidePicker();
    }

    return (
    <View>
        <Text>{props.label}</Text>
        <TouchableWithoutFeedback onPress={showPicker}>
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
        </TouchableWithoutFeedback>
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