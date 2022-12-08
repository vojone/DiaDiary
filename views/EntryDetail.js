import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import EntryItem from '../components/EntryItem';
import React, {useState} from 'react';
import InputSpinner from "react-native-input-spinner";

import { Button } from 'react-native-paper';
import { primaryColor } from '../styles/common';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default function EntryDetail({ navigation }) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [dateTime, setDateTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const onSave = () => {
      Vibration.vibrate([1000]);
  }

  const onRetrieve = () => {
      
  }

  const inputChange = text => {
      
  }

  const getDateFormatted = () => {
      let year = dateTime.getFullYear();
      let day = dateTime.getDate();
      let month = dateTime.getMonth();

      return `${day}. ${month}. ${year}`; //Day. Month. Year
  }

  const getTimeFormatted = () => {
      let hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();

      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; //Hours:Minutes
  }

  const showDatePicker = () => {
      setDatePickerVisibility(true);
  }

  const hideDatePicker = () => {
      setDatePickerVisibility(false);
  }

  const showTimePicker = () => {
      setTimePickerVisibility(true);
  }

  const hideTimePicker = () => {
      setTimePickerVisibility(false);
  }

  const dateSelectionConfirm = (date) => {
      hideDatePicker();

      setDateTime(date);
  };

  const timeSelectionConfirm = (time) => {
      hideTimePicker();

      setDateTime(time);
  };

    //let props=[{record: records}];
    //load records from storage
    let i = 0;
    let cont = true;

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
          placeholder="Nezadáno"
          precision={1}
          type="real"
          emptied={true}
          min={0}
          step={1}
          color={primaryColor}
          />
        </View>
        
        <Text style={styles.text_style.normal}>Podaný inzulín</Text>
        <View style={styles.list_flex}>
          <InputSpinner 
          rounded= {false} // makes the spinner square duh
          showBorder={true} // shows the border of the spinner
          emptied={true} // if input can be empy, not sure if it works the way I think it does
          precision={1} // how many decimals can be inputted
          type="real" // type of input, gets the decimal point
           // style of the input
          placeholder="Nezadáno" // placeholder text when empty
          min={0} // minimum value
          step={1} // step size of the number
          color={primaryColor} // color of the spinner
          /> 
        </View>

        
        <View style={styles.timeinputcontainer}>
            <View>
              <Text>Datum</Text>
              <Text
                onPress={showDatePicker}
              >
                {getDateFormatted()}
              </Text>
              <DateTimePicker 
                date={dateTime}
                mode="date"
                isVisible={isDatePickerVisible}
                onCancel={hideDatePicker}
                onConfirm={dateSelectionConfirm}
                datePickerDialogTheme="#674fa5"
              >
              </DateTimePicker>
            </View>
            <View>
              <Text style={styles.rightaligned}>Čas</Text>
              <Text
                onPress={showTimePicker}
              >
                {getTimeFormatted()}
              </Text>
              <DateTimePicker 
                date={dateTime}
                mode="time"
                isVisible={isTimePickerVisible}
                onCancel={hideTimePicker}
                colorAccent="#674fa5"
                colorBackground="#674fa5"
                onConfirm={timeSelectionConfirm}
              >
              </DateTimePicker>
            </View>
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