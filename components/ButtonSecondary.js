import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { primaryColor } from '../styles/common';

export default function ButtonSecondary(props) {
    return (
        <Button 
            icon={props.icon} 
            mode={props.mode ? props.mode : "outlined"} 
            labelStyle={{fontSize: props.fontSize}}
            onPress={props.onPress}
            loading={props.loading}
            disabled={props.disabled}
            textColor={props.borderColor ? props.borderColor : primaryColor}
            style={StyleSheet.create({borderColor: props.borderColor ? props.borderColor : primaryColor})}
            contentStyle={props.contentStyle}
            >
            {props.title}
        </Button>
    );
}