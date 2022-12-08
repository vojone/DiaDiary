import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Record } from '../models/record';
import { useState } from 'react';

export default function HomeScreen({ navigation }) {
    const [input, setInput] = useState('');
    const [saveKeyInput, setSaveKeyInput] = useState('');
    const [keyInput, setKeyInput] = useState('');
  
    const onSave = () => {
      if(!input) {
        return;
      }
      else {
        let record = new Record({bloodSugar : input, key : saveKeyInput});
        record.save().then(result => {
          alert(`Record saved under ID ${result._id}`);
        });
  
        setInput('');
      }
    }
  
    const onRetrieve = () => {
      Record.find({ key: keyInput }).then(result => {
        if(result) {
          alert(`ID ${result.id} BloodSugar ${result.bloodSugar}`);
        }
        else {
          alert(`The record with ID ${keyInput} was not found!`);
        }
      });
    }
  
    const inputChange = text => {
      setInput(text);
    }
  
    const keyInputChange = text => {
      setKeyInput(text);
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
    });
    
    return (
      <View style={styles.container}>
        <Button title="Go to History" onPress={() => navigation.navigate('Historie')} />
        <Text>Enter Blood Sugar</Text>
        <TextInput
          style={styles.input}
          onChangeText={inputChange}
          value={input}
        />
        <Text>Key</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSaveKeyInput}
          value={saveKeyInput}
        />
        <Button
          title="Save"
          onPress={onSave}
        />

        <Text>Retrieve Blood Sugar with key</Text>
        <TextInput
          style={styles.input}
          onChangeText={keyInputChange}
          value={keyInput}
        />
        <Button
          title="Retrieve"
          onPress={onRetrieve}
        />
      </View>
    );
  }
  