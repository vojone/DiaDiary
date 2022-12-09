import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles, bottomTabBarActiveBgColor, primaryColor } from "../styles/common";
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import DropdownItem from "../components/DropdownItem";

export default function OtherTab() {
    const [tags, setTags] = useState([]);
    const [note, setNote] = useState('');


    const styles = addRecordStyles;
    return (
    <View style={styles.maincontainer}>
        <View>
            <Text>Tagy</Text>
            <MultiSelect
                data={[{ value: '1', label: 'Sport'}, { value: '2', label: 'Před spaním'}, { value: '3', label: 'Ráno'}]}
                value={tags}
                labelField="label"
                valueField="value"
                onChange={setTags}
                onChangeText={() => {}}
                search={false}
                placeholder='Vybrat ze seznamu'
                style={{borderColor: primaryColor, borderWidth: 1, borderRadius: 4, paddingHorizontal: 15, paddingVertical: 10}}
                selectedStyle={{backgroundColor: primaryColor, borderRadius: 100}}
                renderItem={(item, selected) => <DropdownItem item={item} selected={selected} padding={20}></DropdownItem>}
                selectedTextStyle={{color: 'white'}}
                containerStyle={{top: -25}}
            >
            </MultiSelect>

            {/* <MultipleSelectList 
                placeholder="Tagy"
                setSelected={(value) => setTags(value)}
                data={[{ key: '1', value: 'Snídaně'}, { key: '1', value: 'Oběd'}, { key: '1', value: 'Večeře'}, { key: '1', value: 'Snídaně'}]}
                defaultOption={{ key: '4', value: 'Nejedl jsem'}}
                search={false}
                boxStyles={{borderRadius: 4 , borderColor: primaryColor}}
                dropdownTextStyles={{fontSize: 14, borderColor: primaryColor }}
                dropdownStyles={{ borderRadius: 4, borderColor: primaryColor }}
                inputStyles={{borderRadius: 4, borderColor: primaryColor, fontSize: 14}}
            /> */}
        </View>

        <View style={styles.inputwithtopgap}>
            <Text>Poznámky</Text>
            <TextInput 
                placeholder="Text..."
                style={styles.multilineinput}
                multiline={true}
                numberOfLines={3}
            ></TextInput>
        </View>
    </View>);
} 