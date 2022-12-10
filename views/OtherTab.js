import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles } from "../styles/common";

export default function OtherTab() {
    const styles = addRecordStyles;
    return (
    <View style={styles.maincontainer}>
        <View>
            <Text>Tagy</Text>
            <TextInput 
                placeholder="Tag"
            ></TextInput>
        </View>
        <View style={styles.inputwithtopgap}>
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