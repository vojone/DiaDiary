/**
 * Other tab of record adding screen (notes and tags)
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { useEffect, useImperativeHandle, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles, backgroundColor, backgroundColor2, placeholderColor, primaryColor } from "../styles/common";
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import DropdownItem from "../components/DropdownItem";
import { Tag } from "../models/tag";
import { LinearGradient } from "expo-linear-gradient";


export default function OtherTab({ navigation, model, screenref }) {
    //Imperative handle for parent screen RecordAddScreen
    useImperativeHandle(screenref, () => ({
        refresh: (model) => { 
            setTags(model.tags);
            setNote(model.note);
        },
        getData: () => {
            return { 
                tags: tags, 
                note: note,
            }
        } 
    }));


    const [tags, setTags] = useState(model.tags);
    const [note, setNote] = useState(model.note);

    const [tagsEnum, setTagsEnum] = useState([]);

    useEffect(() => {
        //Retrieving tags for dropdown
        Tag.find({}, true).then((tags) => {
            if(tags == null) {
                setTagsEnum([]);
            }
            else {
                setTagsEnum(tags);
            }
        })
    }, [global.settingsChanged]);

    const styles = addRecordStyles;
    return (
    <LinearGradient colors={[backgroundColor, backgroundColor2]} style={{ flex: 1}}>
    <View style={styles.maincontainer}>
        <View>
            <Text>Tagy</Text>
            <MultiSelect
                data={tagsEnum}
                value={tags}
                labelField="label"
                valueField="_id"
                onChange={setTags}
                onChangeText={() => {}}
                search={false}
                placeholder='Vybrat ze seznamu'
                style={{borderColor: primaryColor, borderWidth: 1, borderRadius: 4, paddingHorizontal: 15, paddingVertical: 10}}
                selectedStyle={{backgroundColor: primaryColor, borderRadius: 100}}
                renderItem={(item, selected) => <DropdownItem item={item} selected={selected} padding={20} withIcon={true}></DropdownItem>}
                selectedTextStyle={{color: 'white'}}
                containerStyle={{top: -25}}
            >
            </MultiSelect>
        </View>

        <View style={styles.inputwithtopgap}>
            <Text>Poznámky</Text>
            <TextInput 
                placeholder="Text..."
                placeholderTextColor={placeholderColor}
                style={styles.multilineinput}
                multiline={true}
                numberOfLines={3}
                value={note}
                onChangeText={setNote}
            ></TextInput>
        </View>
    </View>
    </LinearGradient>);
} 