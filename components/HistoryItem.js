import { StyleSheet, View, Text } from "react-native";

export default function HistoryItem(props) {
    const styles = StyleSheet.create({
        text: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: 10,
            padding: 10,
            margin: 4,
            width: 300,
        },
        sugar:{
            flex: 1,
            // color: 'black',
            // width: 20,
            // marginRight: 10,
        },
        insuline:{
            flex: 1,
            // color: 'black',
            // width: 50,
            // marginLeft: 10,
        },
    });

    const record = props.record || {bloodSugar: 0, insulineTaken: 0};

    return (
        <View style={styles.text}>
            <Text style={styles.sugar}>
                Sugar: {record.bloodSugar}
            </Text> 
            <Text style={styles.insuline}>
                Insuline: {record.insulineTaken}
            </Text>
            <Text>
                Date: {record.date.toLocaleTimeString()}
            </Text>
        </View>
    );
}