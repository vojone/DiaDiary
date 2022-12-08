import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { Record } from '../models/record';
import HistoryItem from '../components/HistoryItem';

export default function HistoryScreen({ navigation }) {
    let records = [
            {id: 0, bloodSugar: 100, insulineTaken: 2, date: new Date()},
            {id: 1, bloodSugar: 200, insulineTaken: 1, date: new Date()},
            {id: 2, bloodSugar: 120, insulineTaken: 3, date: new Date()},
            {id: 3, bloodSugar: 50, insulineTaken: 2, date: new Date()},
    ];

    //load records from storage
    let i = 0;
    let cont = true;

    const styles = StyleSheet.create({
            
    });

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>History of records</Text>
            <FlatList data={records} renderItem={({item}) => <HistoryItem key={item.id} record={item} onPress={() => {navigation.navigate('EntryDetail'); console.log('hi');}}></HistoryItem>} />
        </View>
    );
}