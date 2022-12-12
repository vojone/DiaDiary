import InputSpinner from "react-native-input-spinner";
import { primaryColor2, primaryColor2Pressed } from "../styles/common";
import AppendDropdown from "./AppendDropdown";

export default function NumericSpinner(props) {
    return (
        <InputSpinner 
            rounded= {false}
            showBorder={true}
            precision={1}
            placeholderTextColor={props.placeholderColor}
            placeholder={props.placeholder ? props.placeholder : "N"}
            type="real"
            emptied={props.emptied}
            min={props.min}
            step={props.step}
            max={props.max ? props.max : 100}
            color={props.color ? props.color : primaryColor2Pressed}
            colorLeft={props.colorLeft ? props.colorLeft : primaryColor2}
            colorRight={props.colorRight ? props.colorRight : primaryColor2}
            value={props.value}
            onChange={props.onValueChange}
            fontSize={ 28 }
            append={
                props.append
            } // Appended element
        />
    );
}