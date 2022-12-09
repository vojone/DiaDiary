import { useImperativeHandle, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles, placeholderColor, primaryColor } from "../styles/common";
import InputSpinner from "react-native-input-spinner";
import { SelectList } from "react-native-dropdown-select-list";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    const [food, setFood] = useState(model.food);
    const [maxDropdownHeight, setMaxDropdownHeight] = useState(150);

    const layoutChanged = (event) => {
        console.log(event.nativeEvent.layout.height * 0.3);
        setMaxDropdownHeight(event.nativeEvent.layout.height * 0.3);
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
            <SelectList
                setSelected={(value) => setFood(value)}
                data={[{ key: '1', value: 'Snídaně'}, { key: '1', value: 'Oběd'}, { key: '1', value: 'Večeře'}, { key: '1', value: 'Snídaně'}]}
                defaultOption={{ key: '4', value: 'Nejedl jsem'}}
                search={false}
                maxHeight={150}
                arrowicon={  <MaterialCommunityIcons name="chevron-down" size={24} color="black"/> }
                boxStyles={{borderRadius: 4 , borderColor: primaryColor}}
                dropdownTextStyles={{fontSize: 24, borderColor: primaryColor }}
                dropdownStyles={{ borderRadius: 4, borderColor: primaryColor }}
                inputStyles={{borderRadius: 4, borderColor: primaryColor, fontSize: 24}}
            />
        </View>
    </View>);
} 