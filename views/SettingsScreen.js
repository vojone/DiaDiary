/**
 * Settings screen including all settings slides 
 * @author Vojtěch Dvořák (xdvora3o)
 */


import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, FlatList, Dimensions, DevSettings } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import EditableList from '../components/EditableList';
import InitSettingsDropdown from '../components/InitSettingsDropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { showToastMessageDanger, showToastMessageSuccess, ToastMessage } from '../components/ToastMessage';
import { Unit } from '../models/unit';
import { User } from '../models/user';
import { dangerColor, drawerHeaderHeight, placeholderColor, primaryColor, primaryColor2, pureDrawerHeaderHeight, settingStyles } from '../styles/common';
import NumericSlider from '../components/NumericSlider';
import NumericSpinner from '../components/NumericSpinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Tag } from '../models/tag';
import { Button, Dialog, Paragraph } from 'react-native-paper';
import { Record } from '../models/record';
import { removeAS } from '../services/store';
import { Food } from '../models/food';
import RNRestart from 'react-native-restart';


/**
 * Settings functional component
 * @param {*} param0 
 * @returns 
 */
export default function SettingsScreen({ navigation }) {
    const [user, setUser] = useState(global.user);

    //Enums for lists and dropdowns
    const [massUnitsEnum, setMassUnitsEnum] = useState([]);
    const [glycUnitsEnum, setGlycUnitsEnum] = useState([]);

    const [insulineTypesEnum, setInsulineTypesEnum] = useState([]);
    const [newInsulineType, setNewInsulineType] = useState(''); //< State of new field 

    const [tagsEnum, setTagsEnum] = useState([]);
    const [newTag, setNewTag] = useState(''); //< STate of new field

    //Just for input preview
    const [fakeVal1, setFakeVal1] = useState(5.5); 
    const [fakeVal2, setFakeVal2] = useState(5.5);

    const [saving, setSaving] = useState(false);
    const [removing, setRemoving] = useState(false);
    const [reseting, setReseting] = useState(false);

    const [visibleRemoveRecordsDia, setVisibleRemoveRecordsDia] = useState(false);

    const [visibleResetDia, setVisibleResetDia] = useState(false);

    const flatList = useRef();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSaving(false);

            //REtrieving mass units for dropdown
            Unit.find('mass', {}, true).then((result) => {
                if(result !== null) {
                    setMassUnitsEnum(result);
                }
            });
    
            //Retrieving glycemia units for dropdown
            Unit.find('glyc', {}, true).then((result) => {
                if(result !== null) {
                    setGlycUnitsEnum(result);
                }
            });
    
            //Retrieving insuline types for dropdown (and editable list)
            Unit.find('insuline', {}, true).then((result) => {
                if(result !== null) {
                    result.forEach((ins, i) => {
                        ins.key = i;
                    });
    
                    setInsulineTypesEnum(result);
                }
            });

            //Retrieving tags for editable list
            Tag.find({}, true).then((result) => {
                if(result !== null) {
                    result.forEach((ins, i) => {
                        ins.key = i;
                    });
    
                    setTagsEnum(result);
                }
            }); 
    
            //Initial page of settings
            flatList.current.scrollToIndex({animated: false, index: 0});
        });

        return unsubscribe;
    }, [navigation]);

    /**
     * Callback for add insuline type button
     * @returns 
     */
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

    /**
     * Callback for remove insuline type button
     * @returns 
     */
    const insulineRemoved = (key) => {
        setInsulineTypesEnum(arr => arr.filter(e => e.key !== key));
    }

    /**
     * @see insulineTypeAdded (works smilarly but for the tag)
     * @returns 
     */
    const tagAdded = () => {
        if(newTag.trim() == '') {
            return;
        }

        let newTagObj = new Tag({label: newTag});
        
        let maxVal = 0;
        tagsEnum.forEach(element => {
            if(element.key && element.key > maxVal)
                maxVal = element.key;
        });

        newTagObj.key = maxVal + 1;

        setTagsEnum(tag => ([...tag, newTagObj]));

        setNewTag('');
    }

    /**
     * @see insulineRemoved (works smilarly but for the tag)
     * @returns 
     */
    const tagRemoved = (key) => {
        setTagsEnum(arr => arr.filter(e => e.key !== key));
    }

    /**
     * Navigates user to the record list page
     * @returns 
     */
    const goBack = () => {
        navigation.navigate('Records');
    }

    //Provides user feedback after saving is done
    const savingDone = (success = true) => {
        global.settingsChanged = !global.settingsChanged;

        if(success == true) {
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

        //Updating units
        let insulineProm = Unit.remove({ unitType: 'insuline'}, true).then(
            (removed) => {
                let toBeInserted = insulineTypesEnum;

                return Unit.addUnits(toBeInserted);
            },
            (error) => {
                console.error(error);
                savingDone(false);
            }
        );

        //Updating tags
        let tagsProm = Tag.remove({}, true).then(
            (removed) => { 
                let toBeInserted = tagsEnum;

                return Tag.addTags(toBeInserted);
            },
            (error) => {
                console.error(error);
                savingDone(false);
            }
        );

        //Updating user settings
        Promise.allSettled([tagsProm, insulineProm]).then(
            insuline => {
                let newUserSettings = new User(user);

                let prefInsuline = insuline.filter(el => el.label == user.insulineType.label);
                if(prefInsuline) {
                    newUserSettings.newInsulineType;
                }

                User.remove({}, true).then((numofDeleted) => {
                    delete newUserSettings._id;
                    newUserSettings.save().then(
                        (newUser) => {
                            global.user = newUser;
                            savingDone();
                    },
                    error =>{
                        console.error(error);
                        savingDone(false);
                    });
                });
            },
            error => {
                console.error(error);
                savingDone(false);
        });
    }

    //Stylesheet for this screen
    const styles = settingStyles;


    //Hides the remove records dialog
    const hideRemoveRecordsDia = () => {
        setVisibleRemoveRecordsDia(false);
    }

    //Remove all saved records!
    const removeRecords = () => {
        setRemoving(true);
        setVisibleRemoveRecordsDia(false);

        Record.remove({}, true).then(
            (result) => {
                showToastMessageSuccess('Záznamy byly úspěšně vymazány');

                navigation.navigate('Records');
            },
            (error) => {
                console.log(error);
                showToastMessageDanger('Nepodařilo se smazat záznamy');

                navigation.navigate('Records');
        });

        setRemoving(false);
    }

    //Hides dialog window for app reset
    const hideResetDia = () => {
        setVisibleResetDia(false);
    }

    //Resets the entire app
    const resetApp = () => {
        setReseting(true);

        let unitProm = Unit.remove({}, true);
        let foodProm = Food.remove({}, true);
        let tagProm = Tag.remove({}, true);
        let userProm = User.remove({}, true);

        Promise.allSettled([unitProm, foodProm, tagProm, userProm]).then(() => {
            setReseting(false);
            removeAS('initialized').then((result) => {
                try {
                    RNRestart.Restart();
                }
                catch(e) {
                    console.log(e);
                    DevSettings.reload();
                }
            });
        });

        setReseting(false);
    }


    /**
     * Setting slides
     */

    //Unit settings slide
    const unitForm = (item) => {
        return (
            <View  style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.heading}>Jednotky</Text>
                    <View style={styles.form}>
                        <View style={styles.formitem}>
                        <Text style={styles.label}>V jakých jednotkách měříš svou glykémii?</Text>
                        <InitSettingsDropdown
                            data={glycUnitsEnum}
                            onValueChange={(gUnit) => { setUser(user => ({...user, glycemiaUnit: gUnit})) }}
                            value={user.glycemiaUnit}
                            placeholderStyle={{color: 'white'}}
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
                            placeholderStyle={{color: 'white'}}
                        >
                        </InitSettingsDropdown>
                        </View>
                    </View>
                </View>
            </View>);
    }

    //SEttings of insuline types
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
                            placeholderColor="rgba(255, 255, 255, 0.5)"
                            height={Dimensions.get('window').height*0.25}
                            labelField="label"
                            textColor="white"
                            textListColor={primaryColor}
                            backgroundColor="white"
                            idField="key"
                        >
                        </EditableList>
                    </View>

                    <View style={styles.formitem}>
                        <Text style={styles.label}>Který druh nejčastěji?</Text>
                        <InitSettingsDropdown
                            maxHeight={Dimensions.get('window').height*0.18}
                            data={insulineTypesEnum}
                            onValueChange={(type) => { setUser(user => ({...user, insulineType: type})) }}
                            value={user.insulineType ? user.insulineType : insulineTypesEnum[0]}
                            placeholderStyle={{color: 'white'}}
                        >
                        </InitSettingsDropdown>
                    </View>
                </View>
            </View>);
    }


    //Input settings slide
    const inputForm = (item) => {
        return (
            <View style={{flex: 1}}>
                <View>
                    <Text style={styles.heading}>Zadávání hodnot</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Jaké zadávání hodnot ti vyhovuje více?</Text>
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
                                onPress={() => {setUser(u => ({...u, inputType: null })); }}
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

    //Tags settings slide
    const tagsForm = (item) => {
        return (
            <View style={{flex: 1}}>
                <View>
                    <Text style={styles.heading}>Značky</Text>
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Které značky (tagy) chceš používat pro záznamy?</Text>
                        <EditableList
                            newItemValue={newTag}
                            onChangeNewItemValue={setNewTag}
                            data={tagsEnum}
                            onAdd={tagAdded}
                            onRemove={tagRemoved}
                            placeholderColor="rgba(255, 255, 255, 0.5)"
                            height={Dimensions.get('window').height*0.4}
                            labelField="label"
                            textColor="white"
                            textListColor={primaryColor}
                            backgroundColor="white"
                            idField="key"
                        >
                        </EditableList>
                    </View>
                </View>
            </View>);
    }

    //Danger zone form (with app reset button and record removal)
    const dangerForm = (item) => {
        return (
            <View style={{flex: 1}}>
                <View>
                    <Text style={styles.heading}><FontAwesome name="exclamation-triangle" size={24}></FontAwesome>  Nebezpečná zóna</Text>
                </View>
                <View style={styles.form}>
                    <View>
                        <View style={styles.formitem}>
                        <ButtonPrimary
                            fillColor={dangerColor}
                            textColor='white'
                            title='Vymazat záznamy'
                            loading={removing}
                            disabled={removing}
                            onPress={() => { setVisibleRemoveRecordsDia(true); }}
                        >
                        </ButtonPrimary>
                        </View>
                        <View style={styles.formitem}>
                        <ButtonPrimary
                            fillColor={dangerColor}
                            textColor='white'
                            title='Resetovat aplikaci'
                            loading={reseting}
                            disabled={reseting}
                            onPress={() => { setVisibleResetDia(true); }}
                        >
                        </ButtonPrimary>
                        </View>
                    </View>
                </View>
            </View>);
    }

    //Screen is basically horizontal flatlist (this is data array for it)
    const tabs = [
        {num: 0, component: unitForm},
        {num: 1, component: insulineForm},
        {num: 2, component: inputForm},
        {num: 3, component: tagsForm},
        {num: 4, component: dangerForm}
    ]


    //They main layout of settings screen
    return (
        <KeyboardAwareScrollView>
        <View style={{ flex: 1, height: Dimensions.get('window').height - pureDrawerHeaderHeight }}>

        <LinearGradient colors={[primaryColor2, primaryColor]} style={{ flex: 1}}>
        <SafeAreaView
            style={styles.container}
        >

            {/* <View style={styles.topcontrolpanel}>
                <ButtonSecondary 
                    fontSize={12}
                    borderColor="white"
                    icon="arrow-left"
                    onPress={goBack} title="Zpět"
                >
                </ButtonSecondary>
            </View> */}
            <View style={styles.intro}>
                <Text style={styles.mainheading}><FontAwesome name="gear" size={28}></FontAwesome>  Nastavení</Text>
            </View>
            <FlatList
                ref={flatList}
                horizontal={true}
                scrollEnabled={true}
                persistentScrollbar={true}
                disableIntervalMomentum={true}
                snapToAlignment="start"
                data={tabs}
                snapToOffsets={[
                    0, 
                    Dimensions.get('window').width + 100, 
                    (Dimensions.get('window').width + 100)*2,
                    (Dimensions.get('window').width + 100)*3
                ]}
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
            <View style={styles.controlpanel}>
                <ButtonSecondary 
                    borderColor="white"
                    icon="close"
                    onPress={goBack} title="Zrušit"
                >
                </ButtonSecondary>
                <ButtonPrimary 
                    loading={saving}
                    disabled={saving}
                    fillColor="white"
                    icon="check"
                    onPress={saveSettings} title="Uložit"
                >
                </ButtonPrimary>
            </View>

            <Dialog visible={visibleRemoveRecordsDia} onDismiss={hideRemoveRecordsDia}>
                    <Dialog.Title>Vymazat záznamy</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>Skutečně chceš vymazat všechny svoje záznamy? Tuto akci nelze vzít zpět!</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions style={{justifyContent: 'space-between'}}>
                    <Button onPress={hideRemoveRecordsDia}>NE</Button>
                    <Button onPress={removeRecords} labelStyle={{color: dangerColor}}>ANO</Button>
                    </Dialog.Actions>
                </Dialog>


                <Dialog visible={visibleResetDia} onDismiss={hideResetDia}>
                    <Dialog.Title>Resetovat aplikaci</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>Skutečně chceš resetovat aplikaci? Tuto akci nelze vzít zpět!</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions style={{justifyContent: 'space-between'}}>
                    <Button onPress={hideResetDia}>NE</Button>
                    <Button onPress={resetApp} labelStyle={{color: dangerColor}}>ANO</Button>
                    </Dialog.Actions>
                </Dialog>
        </SafeAreaView>
        </LinearGradient>
        </View>
        </KeyboardAwareScrollView>
    );
  }
  