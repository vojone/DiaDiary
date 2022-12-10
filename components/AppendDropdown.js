import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import { bottomTabBarActiveBgColor, primaryColor } from '../styles/common';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import DropdownItem from './DropdownItem';

export default function AppendDropdown(props) {
    const [width, setWidth] = useState(100);

    useEffect(() => {
        let maxlenitem = null;
        props.data.forEach((item) => {
            if(maxlenitem == null || item.label.length > maxlenitem.length) {
                maxlenitem = item.label;
            }
        });

        setWidth((maxlenitem == null ? 50 : maxlenitem.length*10) + 30);
    }, [props.data]);

    return (
        <Dropdown
            data={props.data}
            labelField="label"
            valueField="_id"
            onChange={props.onChange}
            onChangeText={() => {}}
            search={false}
            style={{
                borderColor: primaryColor, 
                width: width, 
                borderLeftWidth: 1, 
                borderRightWidth: 1, 
                borderRadius: 0, 
                paddingHorizontal: 4, 
                paddingVertical: 7.5
            }}
            value={props.value}
            placeholder={props.label ? props.label : '-'}
            renderItem={(item, selected) => <DropdownItem item={item} selected={selected} padding={10}></DropdownItem>}
            containerStyle={{top: -25}}
        >
        </Dropdown>
        // <ModalDropdown
        //     textStyle={{fontSize: 16}} 
        //     dropdownTextStyle={{fontSize: 20, padding: 20, textAlign: 'center'}}
        //     dropdownTextHighlightStyle={{backgroundColor: bottomTabBarActiveBgColor}}
        //     dropdownStyle={{marginTop: -20, minWidth: 50}}
        //     options={props.options} 
        //     style={{padding: 10}}
        //     defaultValue={props.defaultValue}
        //     isFullWidth={true}
        //     renderRightComponent={() => <MaterialCommunityIcons name="chevron-down" size={24} color="black"/>} 
        // />
    );
}