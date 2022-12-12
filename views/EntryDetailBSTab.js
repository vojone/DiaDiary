import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { addRecordStyles, activeColor, placeholderColor, primaryColor } from '../styles/common';
import InputSpinner from 'react-native-input-spinner';
import AppendDropdown from '../components/AppendDropdown';
import { Unit } from '../models/unit';


export default function EntryDetailBSTab({model}) {


    const [bloodSugar, setBloodSugar] = useState(model.bloodSugar);
    const [bloodSugarU, setBloodSugarU] = useState([]);
    const [insuline, setInsuline] = useState(model.insuline);
    const [insulineT, setInsulineT] = useState([]);
    
    // For units inside of dropdown of blood sugar
    const [bloodSugarUEnum, setBloodSugarUEnum] = useState([]);
    useEffect(() => {
      Unit.find('glyc', {}, true).then((glycemiaUnits) => {
        if(glycemiaUnits == null) { // If there are no units of blood sugar
            setBloodSugarUEnum([]); // Set the array to empty
        }
        else {
            setBloodSugarUEnum(glycemiaUnits); // Display all of the units of blood sugar
            setBloodSugarU(glycemiaUnits.find((u) => (u.label == model.bloodSugarU.label)));
        }
      })
    }, []);
    // Same as above, but for insuline
    const [insulineTEnum, setInsulineTEnum] = useState([]);
    useEffect(() => {
      Unit.find('insuline', {}, true).then(insulineTypes => {
        if(insulineTypes == null) {
          setInsulineTEnum([]);
        }
        else {
          setInsulineTEnum(insulineTypes);
          setInsulineT(insulineTypes.find((i) => (i.label == model.insulineT.label)));
        }
      })
    }, []);

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
                    placeholder="N"
                    type="real"
                    emptied={true}
                    min={0}
                    step={0.1}
                    max={100}
                    color={primaryColor}
                    value={bloodSugar}
                    onChange={setBloodSugar}
                    fontSize={ 28 }
                    append={
                        <AppendDropdown
                            data={bloodSugarUEnum}
                            value={bloodSugarU}
                            onChange={setBloodSugarU}
                        ></AppendDropdown>
                    } // Appended element
                />
            </View>

           
            <View style={styles.inputwithtopgap}>
                <Text>Inzulín (jednotky)</Text>
                <InputSpinner 
                    rounded= {false}
                    showBorder={true}
                    placeholder="N"
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
                            data={insulineTEnum}
                            value={insulineT}
                            onChange={setInsulineT}
                        ></AppendDropdown>
                    }
                />
            </View>
        </View>); 
}