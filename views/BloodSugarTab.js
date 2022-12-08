import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { formatOneDecimal } from '../utils';
import { addRecordStyles } from '../styles/common';
import NumericInput from '../components/NumericInput';

const GLYCEMIA_STEP = 0.1;
const GLYCEMIA_INIT = 5.5;

const INSULINE_STEP = 1;
const INSULINE_INIT = NaN;

export default function BloodSugarTab() {
    const [glycemia, setGlycemia] = useState(GLYCEMIA_INIT);
    const [glycemiaInput, setGlycemiaInput] = useState(glycemia.toFixed(1).replace('.', ','));

    const [insuline, setInsuline] = useState(INSULINE_INIT);
    const [insulineInput, setInsulineInput] = useState('');

    const shiftZeros = (str) => {
        while(str.charAt(0) === '0')
            str = str.substring(1);
            
        return str;
    }

    const glycemiaChanged = text => {
        if(text.match(/^([1-9]?\d?[,.]\d?|[1-9]?\d?)$/) == null) {
            return;
        }

        setGlycemiaInput(text.replace('.', ','));

        let newGlycVal = parseFloat(text.replace(',', '.'));
        setGlycemia(newGlycVal);
    }

    const glycemiaInc = () => {
        let newGlycVal = glycemia + GLYCEMIA_STEP;
        if(isNaN(glycemia)) {
            newGlycVal = 0;
        }
        
        setGlycemia(newGlycVal);
        setGlycemiaInput(isNaN(newGlycVal) ? '' : formatOneDecimal(newGlycVal));
    }

    const glycemiaDec = () => {
        let newGlycVal = glycemia - GLYCEMIA_STEP;

        if(newGlycVal < 0) {
            newGlycVal = NaN;
        }

        setGlycemia(newGlycVal);
        setGlycemiaInput(isNaN(newGlycVal) ? '' : formatOneDecimal(newGlycVal));
    }

    const styles = addRecordStyles;
    return (
        <View style={styles.maincontainer}>
            <View>
                <Text>Hladina cukru</Text>
                <View style={styles.inputcontainer}>
                <Button
                    title="-"
                    onPress={glycemiaDec}
                ></Button>
                <TextInput
                    value={glycemiaInput}
                    onChangeText={glycemiaChanged}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="Nezadáno"
                ></TextInput>
                <Button
                    title="+"
                    onPress={glycemiaInc}
                ></Button>
                </View>
            </View>
            {/* <View>
                <Text>5.5</Text>
            </View> */}
            <NumericInput 
                style={styles.inputwrapper}
                value={insuline}
                regex={/^\d*$/}
                label="Podaný inzulín"
                onValueChange={setInsuline}
            >
            </NumericInput>
        </View>);
}