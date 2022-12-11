import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, StatusBar, Platform, FlatList, ScrollView, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { set } from 'react-native-reanimated';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import DropdownItem from '../components/DropdownItem';
import EditableList from '../components/EditableList';
import InitSettingsDropdown from '../components/InitSettingsDropdown';
import { Unit } from '../models/unit';
import { User } from '../models/user';
import { primaryColor } from '../styles/common';

export default function InitSettingsScreen({ navigation }) {
    const [user, setUser] = useState(new User());

    const [massUnitsEnum, setMassUnitsEnum] = useState([]);
    const [glycUnitsEnum, setGlycUnitsEnum] = useState([]);
    const [insulineTypesEnum, setInsulineTypesEnum] = useState([]);
    const [newInsulineType, setNewInsulineType] = useState('');

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const flatList = useRef();

    useEffect(() => {
        Unit.find('mass', {}, true).then((result) => {
            if(result !== null) {
                setMassUnitsEnum(result);

                let initialMassUnit = result.filter(u => u.isReference);
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

                let initialGlycUnit = result.filter(u => u.isReference);
                if(!initialGlycUnit.length) {
                    initialGlycUnit = result[0];
                }
                else {
                    initialGlycUnit = initialGlycUnit[0];
                }

                setUser(user => ({...user, glycemiaUnit: initialGlycUnit}));
            }
        });

        Unit.find('insuline', {}, true).then((result) => {
            if(result !== null) {
                setInsulineTypesEnum(result);
            }
        });
    }, []);

    const insulineTypeAdded = () => {
        if(newInsulineType.trim() == '') {
            return;
        }

        let newUnit = new Unit({unitType: 'insuline', label: newInsulineType});
        newUnit.save().then((newU) => {
            if(newU) {
                setInsulineTypesEnum(arr => [...arr, newU]);

                global.settingsChanged = !global.settingsChanged;
            }
        });

        setNewInsulineType('');
    }

    const insulineRemoved = (id) => {
        Unit.remove({unitType: 'insuline', _id : id}, false).then((num) => {
            if(num) {
                setInsulineTypesEnum(arr => arr.filter(e => e._id !== id));

                global.settingsChanged = !global.settingsChanged;
            }
        });
    }

    const nextSlide = () => {
        if(currentTabIndex >= tabs.length - 1) {
            return;
        }

        flatList.current.scrollToIndex({animated: true, index: currentTabIndex + 1});

        setCurrentTabIndex(currentTabIndex + 1);
    }

    const prevSlide = () => {
        if(currentTabIndex <= 0) {
            return;
        }

        flatList.current.scrollToIndex({animated: true, index: currentTabIndex - 1});

        setCurrentTabIndex(currentTabIndex - 1);
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: primaryColor,
            flex: 1,
            paddingTop: (Platform.OS == 'android' ? StatusBar.currentHeight : 0) + 20,
        },

        heading: {
            fontSize: 36,
            color: 'white',
            fontFamily: 'sans-serif-light',
        },

        form: {
            marginTop: 30,
            flex: 1,
            justifyContent: 'flex-start',
        },

        formitem: {
            marginBottom: 50,
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
        },

        section: {
            paddingHorizontal: 20,
            width: Dimensions.get('window').width,
        },

        lastsection: {
            paddingRight: 0,
            width: Dimensions.get('window').width,
        },

        intro: {
            borderBottomColor: 'white',
            paddingBottom: 20,
            marginBottom: 20,
            borderBottomWidth: 1,
        },

        controlpanel : {
            flexDirection: 'row',
            padding: 20,

            justifyContent: 'space-between',
        },

        controlpanelleftmost: {
            flexDirection: 'row',
            padding: 20,

            justifyContent: 'flex-end',
        }
    });

    const unitForm = (item) => {
        return (
            <View  style={{ flex: 1 }}>
                <View style={styles.intro}>
                    <Text style={styles.heading}>Ahoj!</Text>
                    <Text style={styles.regular}>Jsem tvůj diabetický deník a budu ti pomáhat s monitorováním tvého zdravotního stavu.</Text>
                    <Text style={styles.regular}>Abych ti práci se mnou maximálně zpříjemnil, nastav si, prosím, některé údaje...</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.heading}>Jednotky</Text>
                    <View style={styles.form}>
                        <View style={styles.formitem}>
                        <Text style={styles.label}>V jakých jednotkách měříš svou glykémii?</Text>
                        <InitSettingsDropdown
                            data={glycUnitsEnum}
                            onValueChange={(gUnit) => { setUser(user => ({...user, glycemiaUnit: gUnit})) }}
                            value={user.glycemiaUnit}
                        >
                        </InitSettingsDropdown>
                        </View>

                        <View style={styles.formitem}>
                        <Text style={styles.label}>Jaké jednotky hmotnosti preferuješ?</Text>
                        <InitSettingsDropdown
                            labelField="title"
                            data={massUnitsEnum}
                            onValueChange={(mUnit) => { setUser(user => ({...user, massUnit: mUnit})) }}
                            value={user.massUnit}
                        >
                        </InitSettingsDropdown>
                        </View>
                    </View>
                </View>
            </View>);
    }

    const insulineForm = (item) => {
        return (
            <View style={{flex: 1}}>
                <View>
                    <Text style={styles.heading}>Inzulín</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.formitem}>
                        <Text style={styles.label}>Které druhy inzulínu používáš?</Text>
                        <EditableList
                            newItemValue={newInsulineType}
                            onChangeNewItemValue={setNewInsulineType}
                            data={insulineTypesEnum}
                            onAdd={insulineTypeAdded}
                            onRemove={insulineRemoved}
                            height={Dimensions.get('window').height*0.3}
                            labelField="label"
                            textColor="white"
                            textListColor={primaryColor}
                            backgroundColor="white"
                            idField="_id"
                        >
                        </EditableList>
                    </View>

                    <View style={styles.formitem}>
                        <Text style={styles.label}>Který druh nejčastěji?</Text>
                        <InitSettingsDropdown
                            data={glycUnitsEnum}
                            onValueChange={(gUnit) => { setUser(user => ({...user, glycemiaUnit: gUnit})) }}
                            value={user.glycemiaUnit}
                        >
                        </InitSettingsDropdown>
                    </View>
                </View>
            </View>);
    }


    const tagsForm = (item) => {
        return (
            <View style={{flex: 1}}>
                <View>
                    <Text style={styles.heading}>Značky</Text>
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>V jakých jednotkách měříš svou glykémii?</Text>
                        <InitSettingsDropdown
                            data={glycUnitsEnum}
                            onValueChange={(gUnit) => { setUser(user => ({...user, glycemiaUnit: gUnit})) }}
                            value={user.glycemiaUnit}
                        >
                        </InitSettingsDropdown>

                        <Text style={styles.label}>Jaké jednotky hmotnosti preferuješ?</Text>
                        <InitSettingsDropdown
                            labelField="title"
                            data={massUnitsEnum}
                            onValueChange={(mUnit) => { setUser(user => ({...user, massUnit: mUnit})) }}
                            value={user.massUnit}
                        >
                        </InitSettingsDropdown>

                        <Text style={styles.label}>Které druhy inzulínu používáš?</Text>
                        <EditableList
                            newItemValue={newInsulineType}
                            onChangeNewItemValue={setNewInsulineType}
                            data={insulineTypesEnum}
                            onAdd={insulineTypeAdded}
                            onRemove={insulineRemoved}
                            maxHeight={Dimensions.get('window').height*0.3}
                            labelField="label"
                            idField="_id"
                        >
                        </EditableList>
                    </View>
                </View>
            </View>);
    }

    const tabs = [
        {num: 0, component: unitForm},
        {num: 1, component: insulineForm},
        {num: 2, component: tagsForm}
    ]

    return (
        <SafeAreaView
            style={styles.container}
        >
            <FlatList
                ref={flatList}
                horizontal={true}
                scrollEnabled={false}
                snapToAlignment="start"
                data={tabs}
                pagingEnabled={true}
                keyExtractor={(item) => item.num}
                ItemSeparatorComponent={() => {
                    return (
                        <View
                            style={{
                                height: "100%",
                                width: 100,
                            }} />
                    );
                }}
                renderItem={(item) => { return (
                    <View style={styles.section}>
                        {item.item.component(item)}
                    </View>)}}
            >
            
            </FlatList>
            <View style={currentTabIndex > 0 ? styles.controlpanel : styles.controlpanelleftmost}>
                {currentTabIndex > 0 && <ButtonSecondary 
                    borderColor="white"
                    icon="arrow-left"
                    onPress={prevSlide} title="Zpět"
                >
                </ButtonSecondary>
                }
                {currentTabIndex + 1 < tabs.length && <ButtonSecondary 
                    borderColor="white"
                    contentStyle={{ flexDirection: "row-reverse" }}
                    icon="arrow-right"
                    onPress={nextSlide} title="Další"
                >
                </ButtonSecondary>}
                {currentTabIndex + 1 == tabs.length && <ButtonPrimary 
                    fillColor="white"
                    icon="check"
                    onPress={() => {}} title="Hotovo"
                >
                </ButtonPrimary>}
            </View>
        </SafeAreaView>
    );
  }
  