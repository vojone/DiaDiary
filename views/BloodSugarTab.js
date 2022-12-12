import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { addRecordStyles, backgroundColor, backgroundColor2, placeholderColor } from '../styles/common';
import InputSpinner from 'react-native-input-spinner';
import AppendDropdown from '../components/AppendDropdown';
import { Unit } from '../models/unit';
import NumericSpinner from '../components/NumericSpinner';
import { LinearGradient } from 'expo-linear-gradient';


export default function BloodSugarTab({ navigation, model, screenref }) {
    useImperativeHandle(screenref, () => ({
        refresh: (model) => { 
            setGlycemia(model.bloodSugar);
            setInsuline(model.insuline);

            setDefaultGlycUnit(glycemiaUEnum);
            setDefaultInsulineType(insulineTEnum);
        },
        getData: () => {
            return { 
                bloodSugar: glycemia, 
                bloodSugarU: glycemiaU,
                insuline: insuline,
                insulineT: insulineT, 
            }
        } 
    }));

    const [glycemia, setGlycemia] = useState(model.bloodSugar);
    const [glycemiaU, setGlycemiaU] = useState([]);
    const [insuline, setInsuline] = useState(model.insuline);
    const [insulineT, setInsulineT] = useState([]);

    const [glycemiaUEnum, setGlycemiaUEnum] = useState([]);
    const [insulineTEnum, setInsulineTEnum] = useState([]);

    useEffect(() => {
        Unit.find('glyc', {}, true).then((glycemiaUnits) => {
            if(glycemiaUnits == null) {
                setGlycemiaUEnum([]);
            }
            else {
                setGlycemiaUEnum(glycemiaUnits);
                setGlycemiaU(glycemiaUnits.find((u) => (u.isReference)));

                setDefaultGlycUnit(glycemiaUnits);
            }
        })
    }, [global.user, global.settingsChanged]);

    const setDefaultGlycUnit = (unitArr) => {
        if(!unitArr) {
            return;
        }

        let defGlycU = null;
        if(global.user != null && global.user.glycemiaUnit) {
            defGlycU = unitArr.find((u) => (u._id == global.user.glycemiaUnit._id));
        }
        else {
            defGlycU = unitArr.find((u) => (u.isReference));
        }

        if(!defGlycU) {
            setGlycemiaU(unitArr[0]);
        }
        else {
            setGlycemiaU(defGlycU);
        }
    }


    useEffect(() => {
        Unit.find('insuline', {}, true).then((insulineTypes) => {
            if(insulineTypes == null) {
                setInsulineT([]);
                setInsulineTEnum([]);
            }
            else {
                setInsulineTEnum(insulineTypes);
                setInsulineT(insulineTypes.find((i) => (i.isReference)));

                setDefaultInsulineType(insulineTypes);
            }
        })
    }, [global.user, global.settingsChanged]);

    const setDefaultInsulineType = (typeArr) => {
        if(!typeArr) {
            return;
        }

        let defInsulineType = null;
        if(global.user != null && global.user.insulineType) {
            defInsulineType = typeArr.find((u) => (u._id == global.user.insulineType._id));
        }
        else {
            defInsulineType = typeArr.find((u) => (u.isReference));
        }

        if(!defInsulineType) {
            setInsulineT(typeArr[0]);
        }
        else {
            setInsulineT(defInsulineType);
        }
    }


    const styles = addRecordStyles;
    return (
        <LinearGradient colors={[backgroundColor, backgroundColor2]} style={{ flex: 1}}>
        <View style={styles.maincontainer}>
            <View>
                <Text>Hladina cukru</Text>
                <NumericSpinner
                    placeholderColor={placeholderColor}
                    emptied={true}
                    min={0}
                    step={glycemiaU && glycemiaU.step ? glycemiaU.step : 0.1}
                    max={50}
                    value={glycemia}
                    onValueChange={setGlycemia}
                    append={
                        <AppendDropdown
                            data={glycemiaUEnum}
                            value={glycemiaU}
                            onChange={setGlycemiaU}
                        ></AppendDropdown>
                    } // Appended element
                ></NumericSpinner>
            </View>
            <View style={styles.inputwithtopgap}>
                <Text>Inzulín (jednotky)</Text>
                <NumericSpinner
                    placeholderColor={placeholderColor}
                    emptied={true}
                    min={0}
                    step={insulineT && insulineT.step ? insulineT.step : 1}
                    max={50}
                    value={insuline}
                    onValueChange={setInsuline}
                    append={
                        <AppendDropdown
                            data={insulineTEnum}
                            value={insulineT}
                            onChange={setInsulineT}
                        ></AppendDropdown>
                    } // Appended element
                ></NumericSpinner>
            </View>
        </View>
        </LinearGradient>);
}