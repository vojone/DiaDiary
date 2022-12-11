import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HeaderButton(props){
    return (
        <TouchableHighlight onPress={() => alert('This is a button!')}>
           <View style={{ width: 100, flexDirection: 'row' }}>
                <Text style={{fontSize: 16}}>Settings</Text>
                <MaterialCommunityIcons name="cog" size={21} color="black" style={{marginLeft: 4}}/>
            </View>
        </TouchableHighlight>
    )
}