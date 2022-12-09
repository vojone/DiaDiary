import { useState, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { addRecordStyles, bottomTabBarActiveBgColor, placeholderColor, primaryColor } from '../styles/common';
import InputSpinner from 'react-native-input-spinner';
import AppendDropdown from '../components/AppendDropdown';


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
                    precision={1}
                    placeholderTextColor={placeholderColor}
                    placeholder="Nezadáno"
                    type="real"
                    emptied={true}
                    min={0}
                    step={0.1}
                    max={100}
                    color={primaryColor}
                    value={glycemia}
                    onChange={setGlycemia}
                    fontSize={ 28 }
                    append={
                        <AppendDropdown
                            options={['mmol/l', 'mg/dl']}
                            defaultValue='mmol/l'
                        ></AppendDropdown>
                    } // Appended element
                />
            </View>
            {/* <View>
                <Text>5.5</Text>
            </View> */}
            <View style={styles.inputwithtopgap}>
                <Text>Podaný inzulín (jednotky)</Text>
                <InputSpinner 
                    rounded= {false}
                    showBorder={true}
                    placeholder="Nezadáno"
                    placeholderTextColor={placeholderColor}
                    precision={1}
                    type="real"
                    emptied={true}
                    min={0}
                    step={1}
                    color={primaryColor}
                    value={insuline}
                    onChange={setInsuline}
                    fontSize={ 28 }
                    append={
                        <AppendDropdown
                            options={['Fiasp', 'Novorapid']}
                            defaultValue='Fiasp'
                        ></AppendDropdown>
                    }
                />
            </View>
        </View>);
}