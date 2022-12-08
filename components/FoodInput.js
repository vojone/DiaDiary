import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles } from "../styles/common";

const CARBO_INIT = NaN;
const CARBO_STEP = 1;

export default function FoodInput() {
    const [carbo, setCarbo] = useState(CARBO_INIT);

    const styles = addRecordStyles;
    return (
    <View style={styles.maincontainer}>
        <NumericInput 
            value={carbo}
            regex={/^\d*$/}
            label="Sacharidy"
            onValueChange={setCarbo}
        />
        <Text>Co jste jedl?</Text>
        <TextInput
            multiline={true}
            numberOfLines={5}
            style={styles.multilineinput}
        ></TextInput>
    </View>);
} 