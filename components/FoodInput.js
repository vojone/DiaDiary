import { View, Text, Button, TextInput } from "react-native";
import { addRecordStyles } from "../styles/common";

const CARBO_INIT = NaN;

export default function FoodInput() {
    const [carbo, setCarbo] = useState(CARBO_INIT);
    const [carboInput, setCarboInput] = useState(CARBO_INIT.toString());

    const carboChanged = text => {
        if(text.match(/^\d*$/) == null) {
            return;
        }

        setCarboInput(text);

        let newCarbo = parseInt(text);
        setCarbo(newCarbo);
    }

    const carboInc = () => {
        let newCarbo = carbo + INSULINE_STEP;
        setCarbo(newCarbo);
        setCarboInput(newCarbo.toString());
    }

    const carboDec = () => {
        let newCarbo = carbo - INSULINE_STEP;
        setCarbo(newCarbo);
        setCarboInput(newCarbo.toString());
    }

    const styles = addRecordStyles;
    return (
    <View style={styles.maincontainer}>
        <View>
            <Text>Sacharidy</Text>
            <View style={styles.inputcontainer}>
            <Button
                title="-"
                onPress={carboDec}
            ></Button>
            <TextInput
                value={carboInput}
                onChangeText={carboChanged}
                keyboardType="numeric"
                style={styles.input}
                placeholder="Nezadáno"
            ></TextInput>
            <Button
                title="+"
                onPress={carboInc}
            ></Button>
            </View>
        </View>
    </View>);
} 