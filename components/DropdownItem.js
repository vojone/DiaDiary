import { View, Text } from "react-native";
import { bottomTabBarActiveBgColor } from "../styles/common";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DropdownItem(props) {
    return (
        <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            padding: props.padding, 
            backgroundColor: props.selected ? bottomTabBarActiveBgColor : 'white' }}
            >
            <Text style={{ flex: 1, ...props.textStyle }}>{props.labelField ? props.item[props.labelField] : props.item.label}</Text>
            <Text>{props.withIcon && props.selected ? (<MaterialCommunityIcons name="check"></MaterialCommunityIcons>) : ('') }</Text>
        </View>
    );
}