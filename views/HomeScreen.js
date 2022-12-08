import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Record } from '../models/record';
import { useState } from 'react';

export default function HomeScreen({ navigation }) {
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
        <Button title="Go to History" onPress={() => navigation.navigate('History')} />
        <Text>Enter Blood Sugar</Text>
        <TextInput
          style={styles.input}
          onChangeText={inputChange}
          value={input}
        />
        <Button
          title="Save"
          onPress={onSave}
        />
        <Text>Retrieve Blood Sugar</Text>
        <TextInput
          style={styles.input}
          onChangeText={idInputChange}
          value={idInput}
        />
        <Button
          title="Retrieve"
          onPress={onRetrieve}
        />
        <Button
          title="Entry Detail" 
          onPress={() => navigation.navigate('EntryDetail')} 
        />
      </View>
    );
  }
  