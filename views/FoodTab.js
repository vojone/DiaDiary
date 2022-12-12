import { useEffect, useImperativeHandle, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles, backgroundColor, backgroundColor2, activeColor, placeholderColor, primaryColor } from "../styles/common";
import InputSpinner from "react-native-input-spinner";
import { Dropdown } from "react-native-element-dropdown";
import AppendDropdown from "../components/AppendDropdown";
import DropdownItem from "../components/DropdownItem";
import { Unit } from "../models/unit";
import { Food } from "../models/food";
import { LinearGradient } from "expo-linear-gradient";
import NumericSpinner from "../components/NumericSpinner";
import NumericSlider from "../components/NumericSlider";


export default function FoodTab({ navigation, model, screenref }) {
    useImperativeHandle(screenref, () => ({
        refresh: (model) => { 
            setCarbo(model.carboHydrates);
            setDefaultMassUnit(carboUEnum);
            setDefaultFoodType(foodEnum);
        },
        getData: () => {
            return { 
                carbo: carbo, 
                carboU: carboU, 
                food: food 
            }
        } 
    }));


    const [carbo, setCarbo] = useState(model.carboHydrates);
    const [carboU, setCarboU] = useState([model.carboHydratesU]);
    const [food, setFood] = useState([model.food]);

    const [carboUEnum, setCarboUEnum] = useState([]);
    const [foodEnum, setFoodEnum] = useState([]);

    useEffect(() => {
        Unit.find('mass', {}, true).then((massUnits) => {
            if(massUnits == null) {
                setCarboUEnum([]);
            }
            else {
                setCarboUEnum(massUnits);
                setDefaultMassUnit(massUnits);
            }
        })
    }, [global.user, global.settingsChanged]);


    const setDefaultMassUnit = (unitArr) => {
        if(!unitArr) {
            return;
        }

        let defMassU = null;
        if(global.user != null && global.user.massUnit) {
            defMassU = unitArr.find((u) => (u._id == global.user.massUnit._id));
        }
        else {
            defMassU = unitArr.find((u) => (u.isReference));
        }

        if(!defMassU) {
            setCarboU(unitArr[0]);
        }
        else {
            setCarboU(defMassU);
        }
    }


    useEffect(() => {
        Food.find({}, true, {order: 1}).then((foodTypes) => {
            if(foodTypes == null) {
                setFoodEnum([]);
            }
            else {
                setFoodEnum(foodTypes);
                setDefaultFoodType(foodTypes);
            }
        })
    }, [global.settingsChanged]);

    const setDefaultFoodType = (foodTypes) => {
        if(!foodTypes) {
            return;
        }

        setFood(foodTypes.find((f) => (f.order == -1)));
    }

    const styles = addRecordStyles;
    return (
    <LinearGradient colors={[backgroundColor, backgroundColor2]} style={{ flex: 1}}>
    <View style={styles.maincontainer}>
        <View>
            <Text>Sacharidy</Text>
            {global.user && global.user.inputType == null ?
                <NumericSpinner
                    placeholderColor={placeholderColor}
                    emptied={true}
                    min={0}
                    step={carboU && carboU.step ? carboU.step : 0.1}
                    max={1000}
                    value={carbo}
                    onValueChange={setCarbo}
                    append={
                        <AppendDropdown
                            data={carboUEnum}
                            value={carboU}
                            onChange={setCarboU}
                        ></AppendDropdown>
                    } // Appended element
                ></NumericSpinner>
                :
                <NumericSlider
                    value={carbo}
                    onValueChange={setCarbo}
                    min={0}
                    step={carboU && carboU.step ? carboU.step : 1}
                    max={1000}
                    maximumSliderValue={10}
                    resolution={0}
                    minimumSliderValue={10}
                    appendValueEnum={carboUEnum}
                    appendValue={carboU}
                    onValueChangeAppend={setCarboU}
                >
                </NumericSlider>}
            </View>
        <View style={styles.inputwithtopgap}>
            <Text>Jídlo</Text>
            <Dropdown
                data={foodEnum}
                labelField="label"
                valueField="_id"
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
                placeholder={food ? food.label : '-'}
                value={food}
                containerStyle={{top: -25}}
            >
            </Dropdown>
        </View>
    </View>
    </LinearGradient>);
} 