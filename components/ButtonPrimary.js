/**
 * ButtonPrimary
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { primaryColor } from '../styles/common';

export default function ButtonPrimary(props) {
    return (
        <Button 
            icon={props.icon} 
            mode="contained" 
            onPress={props.onPress}
            loading={props.loading}
            disabled={props.disabled}
            textColor={props.textColor ? props.textColor : primaryColor}
            style={StyleSheet.create({
                borderColor: props.borderColor ? props.borderColor : primaryColor,
                backgroundColor: props.fillColor
            })}
            contentStyle={props.contentStyle}
            >
            {props.title}
        </Button>
    );
}