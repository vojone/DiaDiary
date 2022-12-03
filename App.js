import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { store, get } from './store';


export default function App() {
  const [input, setInput] = useState('');

  const onSave = () => {
    if(!input) {
      return;
    }
    else {
      const objToStore = { text : input };
      store('testKey', objToStore);

      setInput('');
    }
  }

  const onRetrieve = () => {
    get('testKey').then(result => alert(result.text));
  }

  const inputChange = text => {
    setInput(text);
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
