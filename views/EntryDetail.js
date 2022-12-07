import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import EntryItem from '../components/EntryItem';
import React from 'react';

import { List } from 'react-native-paper';
import { Button } from 'react-native-paper';

export default function EntryDetail({ navigation }) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

    let records = [
        {id: 0, bloodSugar: 100, insulineTaken: 2, date: new Date()},
        {id: 1, bloodSugar: 200, insulineTaken: 1, date: new Date()},
        {id: 2, bloodSugar: 120, insulineTaken: 3, date: new Date()},
        {id: 3, bloodSugar: 50, insulineTaken: 2, date: new Date()},
    ];

    let props=[{record: records}];
    //load records from storage
    let i = 0;
    let cont = true;

    const styles = StyleSheet.create({
      list_flex: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'flex-end',
        justifyContent: 'space-between',

        button_minus: {
          
          marginRight: 20,
          marginBottom: 20,
        },

        button_plus: {
          marginLeft: 20,
          marginBottom: 20,
        },

        list: {
          minWidth: 180,
        },
      },

      confirm_buttons_flex: {
        save_button: {
          minWidth: 150,
        },

        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 20,
        justifyContent: 'space-between',
      }
    });

    return (
      <View style={{ margin: 20}}>
        <Text>Entry detail</Text>

        <View style={styles.list_flex}>
          <Button icon="minus" style={styles.list_flex.button_minus} mode="contained" onPress={() => navigation.navigate('Home')}/>

          <List.Section title="Sugar levels" style={styles.list_flex.list}>
            <List.Accordion
              title="Sugar levels"
              left={props => <List.Icon {...props} icon="folder" />}>
              <List.Item title='First item' description='Hello?'/>
              <List.Item title="Second item" />
            </List.Accordion>
          </List.Section>

          <Button icon="plus" style={styles.list_flex.button_plus} mode="contained" onPress={() => navigation.navigate('Home')}/>
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