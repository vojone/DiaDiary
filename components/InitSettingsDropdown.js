import { useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DropdownItem from "./DropdownItem";

export default function InitSettingsDropdown(props) {
    return (
    <Dropdown
        data={props.data}
        labelField={props.labelField ? props.labelField : "label"}
        valueField="_id"
        onChange={props.onValueChange}
        search={false}
        style={{
            borderColor: 'white', 
            borderWidth: 1, 
            borderRadius: 4, 
            paddingHorizontal: 15, 
            paddingVertical: 10
        }}
        renderItem={(item, selected) => <DropdownItem labelField={props.labelField} item={item} selected={selected} padding={20}></DropdownItem>}
        placeholder={props.value ? props.value.label : '-'}
        selectedTextStyle={{ color: 'white', fontSize: 16,  }}
        value={props.value}
        containerStyle={{top: -25}}
    >   
    </Dropdown>);
}