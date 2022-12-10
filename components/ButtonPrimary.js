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
            style={StyleSheet.create({borderColor: primaryColor})}
            >
            {props.title}
        </Button>
    );
}