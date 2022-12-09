import { useImperativeHandle, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles, bottomTabBarActiveBgColor, placeholderColor, primaryColor } from "../styles/common";
import InputSpinner from "react-native-input-spinner";
import { Dropdown } from "react-native-element-dropdown";
import AppendDropdown from "../components/AppendDropdown";
import DropdownItem from "../components/DropdownItem";


export default function FoodTab({ navigation, model, screenref }) {
    useImperativeHandle(screenref, () => ({
        refresh: (model) => { 
            setCarbo(model.carboHydrates);
        },
        getData: () => {
            return { carboHydrates: carbo }
        } 
    }));


    const [carbo, setCarbo] = useState(model.carboHydrates);
    const [carboU, setCarboU] = useState([model.carboU]);
    const [food, setFood] = useState([model.food]);

    const styles = addRecordStyles;
    return (
    <View style={styles.maincontainer}>
        <View>
            <Text>Sacharidy</Text>
            <InputSpinner 
                rounded= {false}
                showBorder={true}
                placeholder="N"
                precision={1}
                type="real"
                emptied={true}
                min={0}
                step={1}
                color= "#674fa5"
                value={carbo}
                fontSize={ 28 }
                placeholderTextColor={ placeholderColor }
                onChange={setCarbo}
                append={
                    <AppendDropdown
                        data={[{value: '1', label: 'g'}, {value: '2', label: 'oz'}]}
                        value={carboU}
                        onChange={setCarboU}
                    ></AppendDropdown>
                } // Appended element
            />
            </View>
        <View style={styles.inputwithtopgap}>
            <Text>Jídlo</Text>
            <Dropdown
                data={[{ value: '0', label: 'Nejedl jsem'}, { value: '1', label: 'Snídaně'}, { value: '2', label: 'Oběd'}, { value: '3', label: 'Večeře'}]}
                labelField="label"
                valueField="value"
                onChange={setFood}
                onChangeText={() => {}}
                search={false}
                style={{
                    borderColor: primaryColor, 
                    borderWidth: 1, 
                    borderRadius: 4, 
                    paddingHorizontal: 15, 
                    paddingVertical: 10
                }}
                renderItem={(item, selected) => <DropdownItem item={item} selected={selected} padding={20}></DropdownItem>}
                placeholder={food.label}
                value={food.value}
                containerStyle={{top: -25}}
            >
            </Dropdown>
        </View>
    </View>);
} 