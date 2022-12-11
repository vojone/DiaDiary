import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import React, { useState, useImperativeHandle, useRef, useEffect } from 'react';
import InputSpinner from "react-native-input-spinner";

import { Button } from 'react-native-paper';
import { addRecordStyles, bottomTabBarActiveBgColor, placeholderColor, primaryColor } from '../styles/common';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePickerWithText from '../components/DateTimePickerWithText';
import AppendDropdown from '../components/AppendDropdown';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Record } from '../models/record';
import { Unit } from '../models/unit';

export default function EntryDetail({ route, navigation}) {
  const {recordId} = route.params;

  const [recordDetail, setRecordDetail] = useState({});
  const [glycemiaUEnum, setGlycemiaUEnum] = useState([]);

  Record.findById(recordId).then((record) => {console.log(record); setRecordDetail(record);});

  
  function updatedBloodSugar(value) {
    setRecordDetail({
      ...recordDetail,
      bloodSugar: value.target.value
    });
  }

  function updatedBloodSugarU(value) {
    setRecordDetail({
      ...recordDetail,
      bloodSugarU: value.target.value
    });
  }

  function updatedInsuline(value) {
    setRecordDetail({
      ...recordDetail,
      insuline: value.target.value
    });
  }

  function updatedInsulineT(value) {
    setRecordDetail({
      ...recordDetail,
      insulineU: value.target.value
    });
  }

  useEffect(() => {
    Unit.find('glyc', {}, true).then((glycemiaUnits) => {
      if(glycemiaUnits == null) {
        setGlycemiaUEnum([]);
      }
      else {
        setGlycemiaUEnum(glycemiaUnits);
      }
    })
  }, []);

  const [insulineTEnum, setInsulineTEnum] = useState([]);

  useEffect(() => {
    Unit.find('insuline', {}, true).then(insulineTypes => {
      if(insulineTypes == null) {
        setInsulineTEnum([]);
      }
      else {
        setInsulineTEnum(insulineTypes);
      }
    })
  }, []);


  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [dateTime, setDateTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const timeSelectionConfirm = (time) => {
      hideTimePicker();

      setDateTime(time);
  };

    const styles = StyleSheet.create({
      list_flex: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      },

      timeinputcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
      },

      text_style: {
        header: {
          fontSize: 20,
          fontWeight: 'bold',
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
      }
    });

    return (
      <View style={{ margin: 20}}>
        <Text style={styles.text_style.header}>Detail záznamu</Text>

        <Text style={styles.text_style.normal}>Hladina cukru</Text>
        <View style={styles.list_flex}>

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
            value={recordDetail.bloodSugar}
            onChange={updatedBloodSugar}
            fontSize={ 28 }
            append={
              <AppendDropdown
                data={glycemiaUEnum}
                value={recordDetail.bloodSugarU}
                onChange={updatedBloodSugarU}
              ></AppendDropdown>
            } // Appended element
          />
        </View>
        
        <Text style={styles.text_style.normal}>Inzulín (jednotky)</Text>
        <View style={styles.list_flex}>
          
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
            value={recordDetail.insuline}
            onChange={updatedInsuline}
            fontSize={ 28 }
            append={
            <AppendDropdown
              data={insulineTEnum}
              value={recordDetail.insulineT}
              onChange={updatedInsulineT}
            ></AppendDropdown>
            }
          />
        </View>

        <View style={styles.timeinputcontainer}>
          <DateTimePickerWithText
            value={dateTime}
            mode="date"
            label="Datum"
            onConfirm={timeSelectionConfirm}
          >
          </DateTimePickerWithText>
          <DateTimePickerWithText
            value={dateTime}
            mode="time"
            label="Čas"
            onConfirm={timeSelectionConfirm}
          >
          </DateTimePickerWithText>
        </View>

        <View style={styles.confirm_buttons_flex}>
        <Button icon="check" style={styles.confirm_buttons_flex.save_button} mode="contained" onPress={() => navigation.navigate('Home')}>
          Save
        </Button>

        <Button icon="close" mode="contained" onPress={() => navigation.navigate('Home')}>
          Back
        </Button>
        </View>

      </View>
    );
}