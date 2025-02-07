/**
 * Append dropdown for numeric inputs
 * @author Vojtěch Dvořák (xdvora3o)
 */

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import { activeColor, primaryColor, primaryColor2 } from '../styles/common';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from 'react';
import DropdownItem from './DropdownItem';

export default function AppendDropdown(props) {
    const [width, setWidth] = useState(100);

    useEffect(() => {
        //Set the width of the dropdown
        let maxlenitem = null;
        props.data.forEach((item) => { //Find the logest element
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
                borderColor: primaryColor2, 
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
            //containerStyle={{top: -25}}
        >
        </Dropdown>
    );
}