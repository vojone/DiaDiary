import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

export default NumericInput = (props) => {
    const { value, onValueChange } = props;

    const [input, setInput] = useState(props.initInputState);

    const inputChanged = text => {
        if(text.match(props.regex) == null) {
            return;
        }

        setInput(text);

        let newVal = parseInt(text);
        onValueChange(newVal);
    }

    const inc = () => {
        let newVal = value + (props.step === undefined ? 1 : props.step);

        if(isNaN(value)) {
            newVal = (props.min === undefined ? 0 : props.min);
        }

        onValueChange(newVal);
        setInput(isNaN(newVal) ? '' : newVal.toString());
    }

    const dec = () => {
        let newVal = value - (props.step === undefined ? 1 : props.step);

        if(newVal < (props.min === undefined ? 0 : props.min)) {
            newVal = NaN;
        }


        onValueChange(newVal);
        setInput(isNaN(newVal) ? '' : newVal.toString());
    }

    const styles = StyleSheet.create({
        inputcontainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
        },
    
        timeinputcontainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    
        rightaligned: {
            textAlign: 'right',
        },
    
        input: {
            borderStyle: 'solid',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            flex: 1,
            fontSize: 32,
            textAlign: 'center',
        }
    });

    return (
    <View>
        <Text>{props.label}</Text>
        <View style={styles.inputcontainer}>
        <Button
            title="-"
            onPress={props.decCallback === undefined ? dec : props.decCallback(setInput)}
        ></Button>
        <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Nezadáno"
            value={input}
            onChangeText={inputChanged}
        ></TextInput>
        <Button
            title="+"
            onPress={props.incCallback === undefined ? inc : props.incCallback(setInput)}
        ></Button>
        </View>
    </View>);
}