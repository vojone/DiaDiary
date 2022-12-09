import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import { bottomTabBarActiveBgColor } from '../styles/common';
import { View, Text } from 'react-native';

export default function AppendDropdown(props) {
    return (
        <ModalDropdown
            textStyle={{fontSize: 16}} 
            dropdownTextStyle={{fontSize: 20, padding: 20, textAlign: 'center'}}
            dropdownTextHighlightStyle={{backgroundColor: bottomTabBarActiveBgColor}}
            dropdownStyle={{marginTop: -20}}
            options={props.options} 
            style={{padding: 10}}
            defaultValue={props.defaultValue}
            isFullWidth={true}
            renderRightComponent={() => <MaterialCommunityIcons name="chevron-down" size={24} color="black"/>} 
        />
    );
}