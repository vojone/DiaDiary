import { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { activeColor, placeholderColor, primaryColor, primaryColor2 } from "../styles/common";
import { Slider } from "@miblanchard/react-native-slider";
import InputSpinner from "react-native-input-spinner";
import AppendDropdown from "./AppendDropdown";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function NumericSlider(props) {
    const [rate, setRate] = useState(0);

    const dropdown = () => {
        return props.append === false ? null : (
        <AppendDropdown
            data={props.appendValueEnum}
            value={props.appendValue}
            onChange={props.onValueChangeAppend}
        ></AppendDropdown>);
    }

    let resolution = props.resolution ? props.resolution : 1;

    useEffect(() => {
        if(((props.value) <= props.min || isNaN(props.value)) && rate < 0) {
            return;
        }
        else if(props.value >= props.max && rate > 0) {
            return;
        }

        if(props.value + Math.round(rate*(10**resolution))/(10**resolution) >= props.max) {
            props.onValueChange(props.max);
            return;
        }
        else if(props.value + Math.round(rate*(10**resolution))/(10**resolution) < props.min) {
            props.onValueChange(props.min);
            return;
        }

        if(isNaN(props.value)) {
            props.onValueChange(props.min);
            return;
        }

        props.onValueChange(props.value + Math.round(rate*(10**resolution))/(10**resolution));
    }, 
    [rate]);

    return (
        <View>
        {rate == 0 ? 
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
                { props.value ? props.value.toFixed(props.resolution ? props.resolution : 1) : ''}
            </Text>
        </View>
        {dropdown()}
        </View>
        }
        <View style={{flex: 1, padding: 10, marginBottom: 30}}>
            <Slider
                value={rate}
                onValueChange={(values) => { setRate(values[0]); }}
                minimumValue={props.minimumSliderVal ? props.minimumSliderVal : -0.2}
                maximumValue={props.maximumSliderVal ? props.maximumSliderVal : 0.2}
                renderThumbComponent={() => (
                <View style={{ 
                    width: 40, 
                    height: 40,
                    borderRadius: 20, 
                    backgroundColor: primaryColor2 }}>
                </View>
                )}
                minimumTrackTintColor={activeColor}
                maximumTrackTintColor={activeColor}
                thumbTintColor={primaryColor2}
                onSlidingComplete={() => { setRate(0); }}
            />
        </View>
    </View>);
}