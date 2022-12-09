import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { primaryColor } from '../styles/common';

export default function ButtonSecondary(props) {
    return (
        <Button 
            icon={props.icon} 
            mode="outlined" 
            onPress={props.onPress}
            loading={props.loading}
            style={StyleSheet.create({borderColor: primaryColor})}
            >
            {props.title}
        </Button>
    );
}