import { View, Text } from "react-native";
import { bottomTabBarActiveBgColor } from "../styles/common";

export default function DropdownItem(props) {
    return (
        <View style={{padding: props.padding, backgroundColor: props.selected ? bottomTabBarActiveBgColor : 'white' }}>
            <Text>{props.item.label}</Text>
        </View>
    );
}