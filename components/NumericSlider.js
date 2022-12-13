/**
 * Experimental numeric input with slider
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { activeColor, placeholderColor, primaryColor, primaryColor2, primaryColor2Pressed } from "../styles/common";
import { Slider } from "@miblanchard/react-native-slider";
import InputSpinner from "react-native-input-spinner";
import AppendDropdown from "./AppendDropdown";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function NumericSlider(props) {
    const [fakeValue, setFakeValue] = useState(props.value); //< FakeValue for better performace (real value is updated after press out)
    const [middle, setMiddle] = useState(props.value);
    const [isActive, setIsActive] = useState(false);

    let rangeMin = props.rangeMin !== undefined ? props.rangeMin : -1;
    let rangeMax = props.rangeMax !== undefined ? props.rangeMax : 1;
    let resolution = props.resolution !== undefined ? props.resolution : 1;

    //Append dropdown with e.g units
    const dropdown = () => {
        return props.append === false ? null : (
        <AppendDropdown
            data={props.appendValueEnum}
            value={props.appendValue}
            onChange={props.onValueChangeAppend}
        ></AppendDropdown>);
    }

    //Update of input when value is changed "from outside"
    useEffect(() => {
        setFakeValue(props.value);
        setMiddle(props.value);
    }, [props.value]);


    //Slider is moved
    const valueChanged = (value) => {
        let newVal = Math.round(value*(10**resolution))/(10**resolution);

        if(props.min !== undefined) {
            if(newVal <= props.min) {
                setFakeValue(props.min);
                return;
            }
        }
        
        if(props.max !== undefined) {
            if(newVal > props.max) {
                return;
            }
        }

        setFakeValue(newVal);
    }

    //Sliding ended
    const updateRealValue = (value) => {
        props.onValueChange(Math.round(fakeValue*(10**resolution))/(10**resolution));


        if(props.min !== undefined) {
            if(value <= props.min) {
                return;
            }
        }
        
        if(props.max !== undefined) {
            if(value > props.max) {
                return;
            }
        }

        setMiddle(value); 
    }

    const bottomMargin = 30;

    return (
        <View>
        {fakeValue == props.value ? 
            <InputSpinner 
                rounded= {false}
                showBorder={true}
                style={{borderWidth: 1}}
                precision={1}
                placeholderTextColor={placeholderColor}
                placeholder="N"
                type="real"
                emptied={true}
                min={props.min}
                step={props.step}
                max={props.max}
                color={primaryColor}
                value={props.value}
                onChange={props.onValueChange}
                fontSize={ 28 }
                buttonStyle={{width: 0}}
                append={dropdown()} // Appended element
            /> : 
            <View style={{ 
                flexDirection: 'row',
                borderRadius: 4,
                borderColor: primaryColor,
                borderWidth: 1,
            }}>
            
                <View
                    style={{
                        flex: 1,
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 28,
                            padding: props.textPadding ? props.textPadding : 0,
                        }}
                    >
                        { fakeValue ? fakeValue.toFixed(props.resolution !== undefined ? props.resolution : 1) : ''}
                    </Text>
                </View>
                {dropdown()}
            </View>
        }

        {/* Slider itself */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <MaterialCommunityIcons name="minus" color={primaryColor} size={16} style={{marginBottom: bottomMargin}}></MaterialCommunityIcons>
        <View style={{flex: 1, padding: 10, marginBottom: bottomMargin}}>
            <Slider
                value={fakeValue}
                onValueChange={(values) => { valueChanged(values[0]); }}
                minimumValue={isNaN(middle) ? rangeMin : middle + rangeMin }
                maximumValue={isNaN(middle) ? rangeMax : middle + rangeMax }
                renderThumbComponent={() => (
                <View  style={{ 
                    width: 40, 
                    height: 40,
                    borderRadius: 20, 
                    backgroundColor: isActive ? primaryColor2Pressed : primaryColor2 }}>
                </View>
                )}
                thumbTouchSize={{height: 50}}
                minimumTrackTintColor={activeColor}
                maximumTrackTintColor={activeColor}
                thumbTintColor={primaryColor2}
                onSlidingStart={() => { setIsActive(true); if(props.onSlidingStartCb) props.onSlidingStartCb(); } }
                onSlidingComplete={() => { setIsActive(false); updateRealValue(fakeValue); if(props.onSlidingCompleteCb) props.onSlidingCompleteCb(); }}
            />
        </View>
        <MaterialCommunityIcons name="plus" size={16} color={primaryColor} style={{marginBottom: bottomMargin}}></MaterialCommunityIcons>
        </View>
    </View>);
}