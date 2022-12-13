/**
 * API for showing styled toast message
 * @author Vojtěch Dvořák (xdvora3o)
 */

import Toast from "react-native-root-toast";
import { dangerColor, primaryColor, successColor, warningColor } from "../styles/common";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from "react-native";


/**
 * Shows the toast message that its style can be modified by arguments
 * @param {*} message 
 * @param {*} bgColor 
 * @param {*} fontColor 
 * @returns 
 */
export function showToastMessage(message, bgColor = primaryColor, fontColor = 'white') {
    return Toast.show( message, {
        duration: Toast.durations.SHORT,
        position: 40,
        show: false,
        animation: true,
        hideOnPress: true,
        containerStyle: { backgroundColor: bgColor },
        textStyle: { color: fontColor },
        delay: 0,
    });
} 



export function showToastMessageSuccess(message) {
    return Toast.show( 
        <>
        <MaterialCommunityIcons name="check" size={16}></MaterialCommunityIcons>
        <Text>{`  ${message}`}</Text>
        </>, {
        duration: Toast.durations.SHORT,
        position: 40,
        show: false,
        animation: true,
        hideOnPress: true,
        containerStyle: { backgroundColor: successColor },
        textStyle: { color: "white" },
        opacity: 1,
        delay: 0,
    });
} 


export function showToastMessageWarning(message) {
    return Toast.show( 
        <>
        <MaterialCommunityIcons name="exclamation" size={16} style={{marginRight: 10}}></MaterialCommunityIcons>
        <Text>{`  ${message}`}</Text>
        </>, {
        duration: Toast.durations.SHORT,
        position: 40,
        show: false,
        animation: true,
        hideOnPress: true,
        opacity: 1,
        containerStyle: { backgroundColor: warningColor },
        textStyle: { color: "black" },
        delay: 0,
    });
} 



export function showToastMessageDanger(message) {
    return Toast.show( 
        <>
        <MaterialCommunityIcons name="close" size={16} style={{marginRight: 10}}></MaterialCommunityIcons>
        <Text>{`  ${message}`}</Text>
        </>, {
        duration: Toast.durations.SHORT,
        position: 40,
        show: false,
        animation: true,
        hideOnPress: true,
        containerStyle: { backgroundColor: dangerColor },
        textStyle: { color: "white" },
        opacity: 1,
        delay: 0,
    });
} 


export function ToastMessage({props, children}) {
    return (
        <Toast
            duration={Toast.durations.SHORT}
            position={40}
            visible={props.visible}
            animation={true}
            hideOnPress={true}
            delay={0}
            style={{ backgroundColor: props.backgroundColor, flexDirection: 'row',  }}
        >
            <Text>{props.icon ? (<MaterialCommunityIcons name="check" color={props.textColor}></MaterialCommunityIcons>) : ('') }</Text>
            <Text style={{color: props.textColor}}>{children}</Text>
        </Toast>
    );
}

