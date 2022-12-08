import { useImperativeHandle, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles } from "../styles/common";
import InputSpinner from "react-native-input-spinner";


export default function FoodTab({ navigation, model, screenref }) {
    useImperativeHandle(screenref, () => ({
        refresh: (model) => { 
            setCarbo(model.carboHydrates);
        },
        getData: () => {
            return { carboHydrates: carbo }
        } 
    }));


    const [carbo, setCarbo] = useState(model.carboHydrates);

    const styles = addRecordStyles;
    return (
    <View style={styles.maincontainer}>
        <View>
            <Text>Sacharidy</Text>
            <InputSpinner 
                rounded= {false}
                showBorder={true}
                placeholder="Nezadáno"
                precision={1}
                type="real"
                emptied={true}
                min={0}
                step={0.1}
                color= "#674fa5"
                value={carbo}
                onChange={setCarbo}
            />
            </View>
        <View style={styles.inputwrapper}>
            <Text>Jídlo</Text>
            <TextInput placeholder="Snídaně"></TextInput>
        </View>
    </View>);
} 