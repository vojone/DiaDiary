/**
 * Contains initial settings of the app
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import EditableList from '../components/EditableList';
import InitSettingsDropdown from '../components/InitSettingsDropdown';
import { showToastMessage, showToastMessageDanger, showToastMessageSuccess, ToastMessage } from '../components/ToastMessage';
import { Unit } from '../models/unit';
import { User } from '../models/user';
import { dangerColor, placeholderColor, primaryColor, primaryColor2, settingStyles, successColor } from '../styles/common';
import NumericSlider from '../components/NumericSlider';
import NumericSpinner from '../components/NumericSpinner';

export default function InitSettingsScreen({ navigation }) {
    const [user, setUser] = useState(new User());

    const [massUnitsEnum, setMassUnitsEnum] = useState([]);
    const [glycUnitsEnum, setGlycUnitsEnum] = useState([]);
    const [insulineTypesEnum, setInsulineTypesEnum] = useState([]);
    const [newInsulineType, setNewInsulineType] = useState('');

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const [saving, setSaving] = useState(false);

    const [fakeVal1, setFakeVal1] = useState(5.5);
    const [fakeVal2, setFakeVal2] = useState(5.5);

    const flatList = useRef();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSaving(false);

            //Retrieving mass units for dropdown
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
    
            //Retrieving glycemia units for dropdown
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
    
            //REtrieving insuline types for dropdown (they can be edited by user later)
            Unit.find('insuline', {}, true).then((result) => {
                if(result !== null) {
                    result.forEach((ins, i) => {
                        ins.key = i;
                    });
    
                    setInsulineTypesEnum(result);

                    setUser(user => ({...user, insulineType: result[0]}));
                }
            });
    
            flatList.current.scrollToIndex({animated: false, index: 0});
    
            setCurrentTabIndex(0);
        });

        return unsubscribe;
    }, [navigation]);

    //Insuline was added to list
    const insulineTypeAdded = () => {
        if(newInsulineType.trim() == '') {
            return;
        }

        let newUnit = new Unit({unitType: 'insuline', label: newInsulineType});
        
        let maxVal = 0;
        insulineTypesEnum.forEach(element => {
            if(element.key && element.key > maxVal)
                maxVal = element.key;
        });

        newUnit.key = maxVal + 1;

        setInsulineTypesEnum(type => ([...type, newUnit]));

        setNewInsulineType('');
    }

    //inslune was removed from list
    const insulineRemoved = (key) => {
        setInsulineTypesEnum(arr => arr.filter(e => e.key !== key));
    }


    //Next button callback
    const nextSlide = () => {
        if(currentTabIndex >= tabs.length - 1) {
            return;
        }

        flatList.current.scrollToIndex({animated: true, index: currentTabIndex + 1});

        setCurrentTabIndex(currentTabIndex + 1);
    }

    //Prev button callback
    const prevSlide = () => {
        if(currentTabIndex <= 0) {
            return;
        }

        flatList.current.scrollToIndex({animated: true, index: currentTabIndex - 1});

        setCurrentTabIndex(currentTabIndex - 1);
    }


    //Saving was finished
    const savingDone = (success = true) => {
        global.settingsChanged = !global.settingsChanged;

        if(success) {
            showToastMessageSuccess('Nastavení bylo úspěšně uloženo');
        }
        else {
            showToastMessageDanger('Při ukládání došlo k chybě');
        }

        navigation.navigate('Records');
        setSaving(false);
    }
    
    //Save button callback
    const saveSettings = () => {
        setSaving(true);
        let insulineProm = Unit.remove({ unitType: 'insuline'}, true).then(() => { return Unit.addUnits(insulineTypesEnum)});

        insulineProm.then(
            insuline => {
                let newUserSettings = new User(user);

                let prefInsuline = insuline.filter(el => el.label == user.insulineType.label);
                if(prefInsuline) {
                    newUserSettings.newInsulineType;
                }

                newUserSettings.save().then(
                    (newUser) => {
                        global.user = newUser;
                        savingDone();
                },
                error => {
                    console.error(error);
                    savingDone(false);
                });
            },
            error => {
                console.error(error);
                savingDone(false);
        });
    }



    const styles = settingStyles; //Stylesheet


    //Form with unit settings
    const unitForm = (item) => {
        return (
            <View  style={{ flex: 1 }}>
                <View style={styles.initintro}>
                    <Text style={styles.initheading}>Ahoj!</Text>
                    <Text style={styles.regular}>Jsem tvůj diabetický deník DiaDiary a budu ti pomáhat s monitorováním tvého zdravotního stavu.</Text>
                    <Text style={styles.regular}>Abych ti práci se mnou maximálně zpříjemnil, nastav si, prosím, některé údaje...</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.initheading}>Jednotky</Text>
                    <View style={styles.initform}>
                        <View style={styles.initformitem}>
                        <Text style={styles.initlabel}>V jakých jednotkách měříš svou glykémii?</Text>
                        <InitSettingsDropdown
                            data={glycUnitsEnum}
                            onValueChange={(gUnit) => { setUser(user => ({...user, glycemiaUnit: gUnit})) }}
                            value={user.glycemiaUnit}
                        >
                        </InitSettingsDropdown>
                        </View>

                        <View style={styles.initformitem}>
                        <Text style={styles.initlabel}>Jaké jednotky hmotnosti preferuješ?</Text>
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

    //Form with insuline type settings
    const insulineForm = (item) => {
        return (
            <View style={{flex: 1}}>
                <View>
                    <Text style={styles.initheading}>Inzulín</Text>
                </View>
                <View style={styles.initform}>
                    <View style={styles.initformitem}>
                        <Text style={styles.initlabel}>Které druhy inzulínu používáš?</Text>
                        <EditableList
                            newItemValue={newInsulineType}
                            onChangeNewItemValue={setNewInsulineType}
                            data={insulineTypesEnum}
                            onAdd={insulineTypeAdded}
                            onRemove={insulineRemoved}
                            placeholderColor="rgba(255, 255, 255, 0.5)"
                            height={Dimensions.get('window').height*0.32}
                            labelField="label"
                            textColor="white"
                            textListColor={primaryColor}
                            backgroundColor="white"
                            idField="key"
                        >
                        </EditableList>
                    </View>

                    <View style={styles.initformitem}>
                        <Text style={styles.initlabel}>Který druh nejčastěji?</Text>
                        <InitSettingsDropdown
                            maxHeight={Dimensions.get('window').height*0.22}
                            data={insulineTypesEnum}
                            onValueChange={(type) => { setUser(user => ({...user, insulineType: type})) }}
                            value={user.insulineType ? user.insulineType : insulineTypesEnum[0]}
                        >
                        </InitSettingsDropdown>
                    </View>
                </View>
            </View>);
    }

    //Form with input settings
    const inputForm = (item) => {
        return (
            <View style={{flex: 1}}>
                <View>
                    <Text style={styles.initheading}>Zadávání hodnot</Text>
                </View>
                <View style={styles.initform}>
                    <Text style={styles.initlabel}>Jaké zadávání hodnot ti vyhovuje více?</Text>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 4, marginBottom: 30 }}>
                            <View style={{ marginBottom: 10 }}>
                            <NumericSpinner
                                placeholderColor={placeholderColor}
                                emptied={true}
                                min={0}
                                step={0.1}
                                max={50}
                                value={fakeVal1}
                                onValueChange={setFakeVal1}
                            ></NumericSpinner>
                            </View>
                            {user.inputType != 1 ?
                            <ButtonSecondary
                                mode="text"
                                icon="check"
                                title="Tento způsob zadávání mi vyhovuje"
                            >
                            </ButtonSecondary>
                            :
                            <ButtonPrimary 
                                fillColor={primaryColor}
                                textColor='white'
                                title="Chci tento způsob"
                                onPress={() => {setUser(u => ({...u, inputType: 0 })); }}
                            >
                            </ButtonPrimary>}
                    </View>
                    <View>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 4 }}>
                        <View style={{ marginBottom: 10 }}>
                            <NumericSlider
                                value={fakeVal2}
                                onValueChange={setFakeVal2}
                                min={0}
                                step={0.1}
                                max={50}
                                append={false}
                                textPadding={6}
                            >
                            </NumericSlider>
                        </View>
                        {user.inputType == 1 ?
                            <ButtonSecondary
                                mode="text"
                                icon="check"
                                title="Tento způsob zadávání mi vyhovuje"
                            >
                            </ButtonSecondary>
                            :
                            <ButtonPrimary 
                                fillColor={primaryColor}
                                textColor='white'
                                title="Chci tento způsob"
                                onPress={() => {setUser(u => ({...u, inputType: 1 })); }}    
                            >
                            </ButtonPrimary>}
                        </View>
                    </View>
                </View>
            </View>);
    }


    //Screen is actualy flatlist 
    const tabs = [
        {num: 0, component: unitForm},
        {num: 1, component: insulineForm},
        {num: 2, component: inputForm}
    ]

    return (
        <LinearGradient colors={[primaryColor2, primaryColor]} style={{ flex: 1}}>
        <SafeAreaView
            style={styles.initcontainer}
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
                    loading={saving}
                    disabled={saving}
                    fillColor="white"
                    icon="check"
                    onPress={saveSettings} title="Hotovo"
                >
                </ButtonPrimary>}
            </View>
        </SafeAreaView>
        </LinearGradient>
    );
  }
  