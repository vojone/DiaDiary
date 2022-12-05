import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Record } from './models/record';


export default function App() {
  const [input, setInput] = useState('');
  const [idInput, setIdInput] = useState(0);

  const onSave = () => {
    if(!input) {
      return;
    }
    else {
      let record = new Record({bloodSugar_ : input});
      record.save().then(result => {
        alert(`Record saved under ID ${result}`);
      });

      setInput('');
    }
  }

  const onRetrieve = () => {
    Record.find(idInput).then(result => {
      if(result) {
        alert(`ID ${result.id} BloodSugar ${result.bloodSugar}`);
      }
      else {
        alert(`The record with ID ${idInput} was not found!`);
      }
    });
  }

  const inputChange = text => {
    setInput(text);
  }

  const idInputChange = text => {
    setIdInput(text);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Type your blood sugar level:</Text>
      <TextInput
        type="text"
        id="test"
        name="test"
        value={input}
        placeholder="Type something"
        onChangeText={inputChange}
      />
      <Button
        title='Save'
        onPress={onSave}
      ></Button>
      <Text>Type your blood sugar level:</Text>
      <TextInput
        type="number"
        id="idInput"
        name="idInput"
        keyboardType='numeric'
        value={idInput}
        placeholder="Select ID of record for retrieving"
        onChangeText={idInputChange}
      />
      <Button
        title='Retrieve'
        onPress={onRetrieve}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
