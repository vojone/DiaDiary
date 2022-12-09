import { useImperativeHandle, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles, placeholderColor, primaryColor } from "../styles/common";
import InputSpinner from "react-native-input-spinner";
import { Dropdown } from "react-native-element-dropdown";
import AppendDropdown from "../components/AppendDropdown";


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
    const [food, setFood] = useState([model.food]);
    const [maxDropdownHeight, setMaxDropdownHeight] = useState(150);

    const layoutChanged = (event) => {
        console.log(event.nativeEvent.layout.height * 0.3);
        setMaxDropdownHeight(event.nativeEvent.layout.height * 0.35);
    }

    const styles = addRecordStyles;
    return (
    <View style={styles.maincontainer} onLayout={layoutChanged}>
        <View>
            <Text>Sacharidy</Text>
            <InputSpinner 
                rounded= {false}
                showBorder={true}
                placeholder="Nezadáno"
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
                        options={['g']}
                        defaultValue='g'
                    ></AppendDropdown>
                } // Appended element
            />
            </View>
        <View style={styles.inputwithtopgap}>
            <Text>Jídlo</Text>
            <Dropdown
                data={[{ value: '1', label: 'Snídaně'}, { value: '1', label: 'Oběd'}, { value: '1', label: 'Večeře'}, { value: '1', label: 'Snídaně'}]}
                labelField="label"
                valueField="value"
                onChange={setFood}
                onChangeText={() => {}}
                search={false}
                style={{borderColor: primaryColor, borderWidth: 1, borderRadius: 4, paddingHorizontal: 15, paddingVertical: 10}}
                placeholder={food.label}
                containerStyle={{top: -25}}
            >
            </Dropdown>
        </View>
    </View>);
} 