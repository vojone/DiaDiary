import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import EntryItem from '../components/EntryItem';
import React from 'react';
import InputSpinner from "react-native-input-spinner";

import { List } from 'react-native-paper';
import { Button } from 'react-native-paper';

export default function EntryDetail({ navigation }) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

    

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
        <Text style={styles.text_style.header}> Entry detail</Text>

        <Text style={styles.text_style.normal}>Sugar level</Text>
        <View style={styles.list_flex}>

          <InputSpinner
            max={10}
            min={0}
            step={1}
            color={"#674fa5"}
            value={i}
            />
        </View>
        
        <Text style={styles.text_style.normal}>Insuline level</Text>
        <View style={styles.list_flex}>
          <InputSpinner
            
            min={0}
            step={1}
            color={"#674fa5"}
            value={i}
            />
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