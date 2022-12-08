import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles } from "../styles/common";

export default function OtherInput() {
    const styles = addRecordStyles;
    return (
    <View style={styles.maincontainer}>
        <View>
            <Text>Tagy</Text>
            <TextInput 
                placeholder="Snídaně"
            ></TextInput>
        </View>
        <View>
            <Text>Poznámky</Text>
            <TextInput 
                placeholder="Text..."
                style={styles.multilineinput}
                multiline={true}
                numberOfLines={3}
            ></TextInput>
        </View>
    </View>);
} 