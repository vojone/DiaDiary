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
          color= "#674fa5"
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
          placeholder="Nezadáno" // placeholder text when empty
          min={0} // minimum value
          step={1} // step size of the number
          color= "#674fa5" // color of the spinner
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