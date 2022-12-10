import { useEffect, useImperativeHandle, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles, bottomTabBarActiveBgColor, placeholderColor, primaryColor } from "../styles/common";
import InputSpinner from "react-native-input-spinner";
import { Dropdown } from "react-native-element-dropdown";
import AppendDropdown from "../components/AppendDropdown";
import DropdownItem from "../components/DropdownItem";
import { Unit } from "../models/unit";
import { Food } from "../models/food";


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
    }, [global.user]);


    const setDefaultMassUnit = (unitArr) => {
        if(!unitArr) {
            return;
        }

        if(global.user != null && global.user.massUnit) {
            setCarboU(unitArr.find((u) => (u._id == global.user.massUnit._id)));
        }
        else {
            setCarboU(unitArr.find((u) => (u.isReference)));
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
    }, []);

    const setDefaultFoodType = (foodTypes) => {
        if(!foodTypes) {
            return;
        }

        setFood(foodTypes.find((f) => (f.order == -1)));
    }

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
                        data={carboUEnum}
                        value={carboU}
                        onChange={setCarboU}
                    ></AppendDropdown>
                } // Appended element
            />
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
    </View>);
} 