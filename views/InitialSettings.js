import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DropdownItem from '../components/DropdownItem';
import { Unit } from '../models/unit';
import { User } from '../models/user';
import { primaryColor } from '../styles/common';

export default function InitSettingsScreen({ navigation }) {
    const [user, setUser] = useState(new User());

    const [massUnitsEnum, setMassUnitsEnum] = useState([]);

    useEffect(() => {
        Unit.find('mass', {}, true).then((result) => {
            if(result !== null) {
                setMassUnitsEnum(result);

                let initialMAssUnit = result.filter(u => u.isReference);

                setUser(user => ({...user, massUnit: initialMAssUnit}));
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

        regular: {
            marginTop: 10,
            fontSize: 16,
            color: 'white',
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
                <Text>Jaké používáte jednotky hmotnosti?</Text>
                <Dropdown
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
                    value={user.massUnit}
                    containerStyle={{top: -25}}
            ></Dropdown>
            </View>
        </SafeAreaView>
    );
  }
  