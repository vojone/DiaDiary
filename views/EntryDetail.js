// Entry detail screen
// Autor: Tomáš Dvořák (xdvora3r)

/**
 * Entry detail screen
 * @author Tomáš Dvořák (xdvora3r)
 */

import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, TextInput, Vibration} from 'react-native';
import React, { useState, useEffect } from 'react';
import InputSpinner from "react-native-input-spinner";
import { Button } from 'react-native-paper';
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

import { showToastMessage, showToastMessageDanger, showToastMessageSuccess, showToastMessageWarning } from '../components/ToastMessage';
import DateTimePickerWithText from '../components/DateTimePickerWithText';
import AppendDropdown from '../components/AppendDropdown';
import DropdownItem from "../components/DropdownItem";
import { LinearGradient } from 'expo-linear-gradient';

import { primaryColor2Pressed, placeholderColor, primaryColor, primaryColor2, backgroundColor, backgroundColor2 } from '../styles/common';
import { Record } from '../models/record';
import { Unit } from '../models/unit';
import { Food } from "../models/food";
import { Tag } from "../models/tag";


export default function EntryDetail({route, navigation}) {

  const {recordId} = route.params;

  const [recordDetail, setRecordDetail] = useState({});
  const [recordDetailOld, setRecordDetailOld] = useState({});
  
  useEffect(() => {
    Record.findById(recordId).then((record) => {setRecordDetail(record); setRecordDetailOld(record); setDateTime(record.dateTime)});
  }, []);

  // Function to update the record
  function updatedBloodSugar(value) {
    setRecordDetail(recordDetail => ({
      ...recordDetail, bloodSugar: value
    }));
  }

  function updatedBloodSugarU(value) {
    setRecordDetail(recordDetail => ({
      ...recordDetail, bloodSugarU: value
    }))
  }
  
  function updatedInsuline(value) {
    setRecordDetail(recordDetail => ({
      ...recordDetail, insuline: value
    }))
  }

  function updatedInsulineT(value) {
    setRecordDetail(recordDetail => ({
      ...recordDetail, insulineT: value
    }))
  }

  function updatedCarbo(value) {
    setRecordDetail(recordDetail => ({
      ...recordDetail, carbo: value
    }))
  }

  function updatedCarboU(value) {
    setRecordDetail(recordDetail => ({
      ...recordDetail, carboU: value
    }))
  }

  function updatedFood(value) {
    setRecordDetail(recordDetail => ({
      ...recordDetail, food: value
    }))
  }

  function updatedTags(value) {
    setRecordDetail(recordDetail => ({
      ...recordDetail, tags: value
    }))
  }

  function updatedNote(value) {
    setRecordDetail(recordDetail => ({
      ...recordDetail, note: value
    }))
  }

  const [buttonDisable, setButtonDisable] = useState(false);

  const updateRecord = () => {
    setButtonDisable(true);
    delete recordDetail._id;
    Vibration.vibrate(200);
    showToastMessageSuccess('Záznam byl upraven');
    Record.remove({_id: recordId}).then(() => {new Record(recordDetail).save()});
    navigation.goBack();
  };

  const deleteRecord = () => {
    return Alert.alert(
      "Smazat záznam",
      "Opravdu chcete smazat tento záznam?",
      [{
        text: "Ano",
        onPress: () => {
          setButtonDisable(true);
          Vibration.vibrate(200);
          showToastMessageSuccess('Záznam byl smazán');

          Record.remove({_id: recordId}).then(() => {navigation.goBack()});//navigation.navigate('Home')});
          // Delete record
      },
      },

      {
        text: "Ne",
        onPress: () => {
          showToastMessageWarning('Smazání záznamu zrušeno');
        },
      },
      ]
    );
  };

  // Stuff for the blood sugar
  const [bloodSugarU, setBloodSugarU] = useState([]);
  const [insulineT, setInsulineT] = useState([]);

  const [glycemiaUEnum, setGlycemiaUEnum] = useState([]);
  const [insulineTEnum, setInsulineTEnum] = useState([]);

  // Stuff for the food section
  const [carbo, setCarbo] = useState(recordDetail.carbo);
  const [carboU, setCarboU] = useState([recordDetail.carboHydratesU]);
  const [food, setFood] = useState([recordDetail.food]);

  const [carboUEnum, setCarboUEnum] = useState([]);
  const [foodEnum, setFoodEnum] = useState([]);

  // Stuff for the tags section
  const [tags, setTags] = useState(recordDetail.tags);
  const [note, setNote] = useState(recordDetail.note);

  const [tagsEnum, setTagsEnum] = useState([]);

  useEffect(() => {
    Unit.find('glyc', {}, true).then((glycemiaUnits) => {
      if(glycemiaUnits == null) {
        setGlycemiaUEnum([]);
      }
      else {
        setGlycemiaUEnum(glycemiaUnits);
        if(recordDetail.insulineT != null)
            setBloodSugarU(glycemiaUnits.find((u) => (u.label == recordDetail.bloodSugarU.label)));
      }
    })
    Unit.find('insuline', {}, true).then(insulineTypes => {
      if(insulineTypes == null) {
        setInsulineTEnum([]);
      }
      else {
        setInsulineTEnum(insulineTypes);
        if(recordDetail.insulineT != null)
          setInsulineT(insulineTypes.find((i) => (i.label == recordDetail.insulineT.label)));
      }
    })
     // Get the carbo hydrates units
     Unit.find('mass', {}, true).then((massUnits) => {
      //console.log(massUnits);
      if(massUnits == null) {
          setCarboUEnum([]);
      }
      else {
          setCarboUEnum(massUnits);
          if(recordDetail.insulineT != null)
            setCarboU(massUnits.find((u) => (u.label == recordDetail.carboU.label)));
      }
  })
  // Get the food types
  Food.find({}, true, {order: 1}).then((foodTypes) => {
    if(foodTypes == null) {
        setFoodEnum([]);
    }
    else {
        setFoodEnum(foodTypes);
        if(recordDetail.insulineT != null)
          setFood(foodTypes.find((t) => (t.label == recordDetail.food.label)));
    }
  })
    Tag.find({}, true).then((tags) => {
      if(tags == null) {
          setTagsEnum([]);
      }
      else {
          setTagsEnum(tags);
          if(recordDetail.tags != null){
            
            setTags(recordDetail.tags)
          }
      }
  })
  
  }, [recordDetailOld]);

  // Stuff for the date and time section
  const handlePress = () => setExpanded(!expanded);
  const [dateTime, setDateTime] = useState(new Date());
  const [isDateModified, setIsDateModified] = useState(false);
  const [isTimeModified, setIsTimeModified] = useState(false);
  const [isDateTimeSync, setDateTimeSync] = useState(true);

  const onDateTimeSelectionOpen = () => {
    setDateTimeSync(false);
}

const onDateTimeSelectionCancel = () => {
    if(isDateModified != true && isTimeModified != true) {
        syncDateTime(true);
    }
}

const dateSelectionConfirm = (date) => {
    setDateTime(date);
    setIsDateModified(true);
    setDateTimeSync(false);

    setRecordDetail(recordDetail => ({
      ...recordDetail, dateTime: date
    }))
};

const timeSelectionConfirm = (time) => {
    setDateTime(time);
    setIsTimeModified(true);
    setDateTimeSync(false);

    setRecordDetail(recordDetail => ({
      ...recordDetail, dateTime: time
    }))
};

    const styles = StyleSheet.create({
        tabcontainer: {
            flex: 1,
        },

        controlpanel: {
            height: 80,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            paddingLeft: 20,
            paddingRight: 20,
        },

        maincontainer: {
            padding : 15,
        },

      timeinputcontainer: {
        marginTop: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
      },

      text_style: {
        header: {
          fontSize: 20,
          fontWeight: 'bold',
          middle: {
            marginTop: 60,
            fontSize: 20,
            fontWeight: 'bold',

          }
        },
        normal: {
          marginTop: 20,
          marginBottom: 5,
          fontSize: 16,
        }
      },

      confirm_buttons_flex: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 20,
        justifyContent: 'space-between',
        
        save_button: {
          minWidth: 150,
        },
      },

      delete_button_flex: {
        flexDirection: 'row',
        
        marginTop: 20,
        justifyContent: 'flex-end',

        delete_button: {
          marginTop: 20,
          maxWidth: 195,
          borderColor: primaryColor,

          text: {
            fontSize: 20,
          }
        }
      },

      textinput: {
        textAlign: 'left',
        textAlignVertical: 'top',

        padding: 15,

        fontSize: 20,

        minHeight: 100,

        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,

        borderColor: primaryColor,
        borderRadius: 4,
    }
    });

    
    return (
      <LinearGradient colors={[backgroundColor, backgroundColor2]} style={{ flex: 1}}>
      <SafeAreaView style={{margin: 5}}>
        <ScrollView>
          <View style={styles.maincontainer}>
        
        <Text style={styles.text_style.header}>Hladina cukru</Text>

        <Text style={styles.text_style.normal}>Hladina cukru</Text>
        <View style={styles.list_flex}>
        { recordDetail.bloodSugar &&
        <InputSpinner 
            rounded= {false}
            showBorder={true}
            precision={1}
            placeholderTextColor={placeholderColor}
            placeholder="N"
            type="real"
            emptied={true}
            min={0}
            step={recordDetail.bloodSugarU ? recordDetail.bloodSugarU.step : 0.1}
            color={primaryColor2Pressed}
            colorLeft={primaryColor2}
            colorRight={primaryColor2}
            max={50}
            value={recordDetail.bloodSugar}
            onChange={updatedBloodSugar}
            fontSize={ 28 }
            append={
              recordDetail.bloodSugarU &&
              <AppendDropdown
                data={glycemiaUEnum}
                value={bloodSugarU}
                onChange={updatedBloodSugarU}
              ></AppendDropdown>
            } // Appended element
          />
        }
        </View>

        <Text style={styles.text_style.normal}>Inzulín (jednotky)</Text>
        <View style={styles.list_flex}>
          { recordDetail.bloodSugar &&
          <InputSpinner 
            rounded= {false}
            showBorder={true}
            placeholder="N"
            placeholderTextColor={placeholderColor}
            precision={1}
            type="real"
            emptied={true}
            min={0}
            max={50}
            step={recordDetail.insulineT ? recordDetail.insulineT.step : 0.1}
            color={primaryColor2Pressed}
            colorLeft={primaryColor2}
            colorRight={primaryColor2}
            value={recordDetail.insuline}
            onChange={updatedInsuline}
            fontSize={ 28 }
            append={
              recordDetail.insulineT &&
            <AppendDropdown
              data={insulineTEnum}
              value={insulineT}
              onChange={updatedInsulineT}
            ></AppendDropdown>
            }
          />
        }
        </View>

        <Text style={styles.text_style.header.middle}>Jídlo</Text>

        <View>
            <Text style={styles.text_style.normal}>Sacharidy</Text>
            <InputSpinner 
                rounded= {false}
                showBorder={true}
                placeholder="N"
                precision={1}
                type="real"
                emptied={true}
                min={0}
                max={1000}
                step={recordDetail.carboU ? recordDetail.carboU.step : 0.1}
                color={primaryColor2Pressed}
                colorLeft={primaryColor2}
                colorRight={primaryColor2}
                value={recordDetail.carbo}
                fontSize={ 28 }
                placeholderColor={ placeholderColor }
                onChange={updatedCarbo}
                append={
                    <AppendDropdown
                        data={carboUEnum}
                        value={carboU}
                        onChange={updatedCarboU}
                    ></AppendDropdown>
                } // Appended element
            />
            </View>
        <View style={styles.inputwithtopgap}>
            <Text style={styles.text_style.normal}>Jídlo</Text>
            <Dropdown
                data={foodEnum}
                labelField="label"
                valueField="_id"
                onChange={updatedFood}
                onChangeText={() => {}}
                search={false}
                style={{
                    borderColor: primaryColor, 
                    borderWidth: 1, 
                    borderRadius: 4, 
                    paddingHorizontal: 15, 
                    paddingVertical: 10
                }}
                renderItem={(item, selected) => <DropdownItem item={item} selected={selected} padding={20}></DropdownItem>}
                placeholder={food ? food.label : '-'}
                value={food}
                containerStyle={{top: -25}}
            >
            </Dropdown>
        </View>


        <Text style={styles.text_style.header.middle}>Ostatní</Text>

        <View>
            <Text style={styles.text_style.normal}>Tagy</Text>
            <MultiSelect
                data={tagsEnum}
                value={recordDetail.tags}
                labelField="label"
                valueField="_id"
                onChange={updatedTags}
                onChangeText={() => {}}
                search={false}
                placeholder='Vybrat ze seznamu'
                style={{borderColor: primaryColor, borderWidth: 1, borderRadius: 4, paddingHorizontal: 15, paddingVertical: 10}}
                selectedStyle={{backgroundColor: primaryColor, borderRadius: 100}}
                renderItem={(item, selected) => <DropdownItem item={item} selected={selected} padding={20} withIcon={true}></DropdownItem>}
                selectedTextStyle={{color: 'white'}}
                containerStyle={{top: -25}}
            >
            </MultiSelect>
        </View>
        

        <View>
            <Text style={styles.text_style.normal}>Poznámky</Text>
            <TextInput 
                placeholder="Text..."
                style={styles.textinput}
                multiline={true}
                numberOfLines={3}
                value={recordDetail.note}
                onChangeText={updatedNote}
            ></TextInput>
        </View>
        
        <View style={styles.delete_button_flex}>
        <Button icon="alert" style={styles.delete_button_flex.delete_button} mode="outlined" disabled={buttonDisable} onPress={deleteRecord}>
          <Text style={styles.delete_button_flex.delete_button.text}>Smazat záznam</Text>
        </Button>
        </View>
        
        {recordDetail.dateTime &&
        <View style={styles.timeinputcontainer}>   
          <DateTimePickerWithText
              value={dateTime}
              mode="date"
              label={`Datum`}
              onConfirm={dateSelectionConfirm}
              onOpen={onDateTimeSelectionOpen}
              onCancel={onDateTimeSelectionCancel}
              isModified={isDateModified}
          >
          </DateTimePickerWithText>
          
          <DateTimePickerWithText
              value={dateTime}
              mode="time"
              label={`Čas`}
              onConfirm={timeSelectionConfirm}
              onOpen={onDateTimeSelectionOpen}
              onCancel={onDateTimeSelectionCancel}
              isModified={isTimeModified}
          >
          </DateTimePickerWithText>
        </View>
        }
        

        <View style={styles.confirm_buttons_flex}>
        <Button icon="check" style={styles.confirm_buttons_flex.save_button} mode="contained" disabled={buttonDisable} onPress={updateRecord}>
          Uložit změny
        </Button>

        <Button icon="close" mode="contained" disabled={buttonDisable} onPress={() => navigation.goBack()}>
          Zrušit
        </Button>
        </View>
      </View>
      </ScrollView>
      </SafeAreaView>
      </LinearGradient>
    );
}
    