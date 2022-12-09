import { useState, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { formatOneDecimal } from '../utils';
import { addRecordStyles } from '../styles/common';
import InputSpinner from 'react-native-input-spinner';


export default function BloodSugarTab({ navigation, model, screenref }) {
    useImperativeHandle(screenref, () => ({
        refresh: (model) => { 
            setGlycemia(model.bloodSugar);
            setInsuline(model.insuline);
        },
        getData: () => {
            return { bloodSugar: glycemia, insuline: insuline }
        } 
    }));

    const [glycemia, setGlycemia] = useState(model.bloodSugar);
    const [insuline, setInsuline] = useState(model.insuline);

    const shiftZeros = (str) => {
        while(str.charAt(0) === '0')
            str = str.substring(1);
            
        return str;
    }

    const glycemiaChanged = value => {
        setGlycemia(value);
    }

    const insulineChanged = value => {
        setInsuline(value)
    }

    const styles = addRecordStyles;
    return (
        <View style={styles.maincontainer}>
            <View>
                <Text>Hladina cukru</Text>
                <InputSpinner 
                    rounded= {false}
                    showBorder={true}
                    placeholder="Nezadáno"
                    precision={1}
                    type="real"
                    emptied={true}
                    min={0}
                    step={0.1}
                    color= "#674fa5"
                    value={glycemia}
                    onChange={setGlycemia}
                />
            </View>
            {/* <View>
                <Text>5.5</Text>
            </View> */}
            <View style={styles.inputwrapper}>
                <Text>Podaný inzulín</Text>
                <InputSpinner 
                    rounded= {false}
                    showBorder={true}
                    placeholder="Nezadáno"
                    precision={1}
                    type="real"
                    emptied={true}
                    min={0}
                    step={0.1}
                    color= "#674fa5"
                    value={insuline}
                    onChange={setInsuline}
                />
            </View>
        </View>);
}