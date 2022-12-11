import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { addRecordStyles, bottomTabBarActiveBgColor, placeholderColor, primaryColor } from '../styles/common';
import InputSpinner from 'react-native-input-spinner';
import AppendDropdown from '../components/AppendDropdown';
import { Unit } from '../models/unit';


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
        else if(unitArr.length == 1) {
            setInsulineT(unitArr[0]);
            return;
        }

        if(global.user != null && global.user.glycemiaUnit) {
            setGlycemiaU(unitArr.find((u) => (u._id == global.user.glycemiaUnit._id)));
        }
        else {
            setGlycemiaU(unitArr.find((u) => (u.isReference)));
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
                    step={glycemiaU && glycemiaU.step ? glycemiaU.step : 0.1}
                    max={100}
                    color={primaryColor}
                    value={glycemia}
                    onChange={setGlycemia}
                    fontSize={ 28 }
                    append={
                        <AppendDropdown
                            data={glycemiaUEnum}
                            value={glycemiaU}
                            onChange={setGlycemiaU}
                        ></AppendDropdown>
                    } // Appended element
                />
            </View>
            {/* <View>
                <Text>5.5</Text>
            </View> */}
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
                    step={insulineT && insulineT.step ? insulineT.step : 1}
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