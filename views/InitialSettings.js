import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DropdownItem from '../components/DropdownItem';
import InitSettingsDropdown from '../components/InitSettingsDropdown';
import { Unit } from '../models/unit';
import { User } from '../models/user';
import { primaryColor } from '../styles/common';

export default function InitSettingsScreen({ navigation }) {
    const [user, setUser] = useState(new User());

    const [massUnitsEnum, setMassUnitsEnum] = useState([]);
    const [glycUnitsEnum, setGlycUnitsEnum] = useState([]);

    useEffect(() => {
        Unit.find('mass', {}, true).then((result) => {
            if(result !== null) {
                setMassUnitsEnum(result);

                let initialMassUnit = result.filter(u => u.r);
                if(!initialMassUnit.length) {
                    initialMassUnit = result[0];
                }
                else {
                    initialMassUnit = initialMassUnit[0];
                }

                setUser(user => ({...user, massUnit: initialMassUnit}));
            }
        });

        Unit.find('glyc', {}, true).then((result) => {
            if(result !== null) {
                setGlycUnitsEnum(result);

                let initialGlycUnit = result.filter(u => u.r);
                if(!initialGlycUnit.length) {
                    initialGlycUnit = result[0];
                }
                else {
                    initialGlycUnit = initialGlycUnit[0];
                }

                setUser(user => ({...user, glycemiaUnit: initialGlycUnit}));
            }
        });
    },[]);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: primaryColor,
            flex: 1,
            paddingTop: (Platform.OS == 'android' ? StatusBar.currentHeight : 0) + 20,
            paddingHorizontal: 20,
        },

        heading: {
            fontSize: 36,
            color: 'white',
            fontFamily: 'sans-serif-light',
        },

        form: {
            marginTop: 30,
        },

        regular: {
            marginTop: 10,
            fontSize: 16,
            color: 'white',
        },

        label: {
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',
        }
    });

    return (
        <SafeAreaView
            style={styles.container}
        >
            <View>
                <Text style={styles.heading}>Ahoj!</Text>
                <Text style={styles.regular}>Jsem tvůj diabetický deník a budu ti pomáhat s monitorováním tvého zdravotního stavu.</Text>
                <Text style={styles.regular}>Abych ti práci se mnou maximálně zpříjemnil, nastav si, prosím, některé údaje...</Text>
            </View>
            <View>
                <View style={styles.form}>
                    <Text style={styles.label}>V jakých jednotkách měříš svou glykémii?</Text>
                    <InitSettingsDropdown
                        data={glycUnitsEnum}
                        onValueChange={(gUnit) => { setUser(user => ({...user, glycemiaUnit: gUnit})) }}
                        value={user.glycemiaUnit}
                    >
                    </InitSettingsDropdown>

                    <Text style={styles.label}>Jaké jednotky hmotnosti používáš?</Text>
                    <InitSettingsDropdown
                        labelField="title"
                        data={massUnitsEnum}
                        onValueChange={(mUnit) => { setUser(user => ({...user, massUnit: mUnit})) }}
                        value={user.massUnit}
                    >
                    </InitSettingsDropdown>
                    {/* <Dropdown
                        data={massUnitsEnum}
                        labelField="label"
                        valueField="_id"
                        onChange={(mUnit) => { setUser(user => ({...user, massUnit: mUnit})) }}
                        search={false}
                        style={{
                            borderColor: 'white', 
                            borderWidth: 1, 
                            borderRadius: 4, 
                            paddingHorizontal: 15, 
                            paddingVertical: 10
                        }}
                        renderItem={(item, selected) => <DropdownItem item={item} selected={selected} padding={20}></DropdownItem>}
                        placeholder={user.massUnit ? user.massUnit.label : '-'}
                        selectedTextStyle={{ color: 'white', fontSize: 16,  }}
                        value={user.massUnit}
                        containerStyle={{top: -25}}
                    >   
                    </Dropdown> */}
                </View>
            </View>
        </SafeAreaView>
    );
  }
  