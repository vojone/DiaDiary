/**
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { FlatList, View, Text, Button, TextInput } from "react-native";
import { dangerColor, primaryColor } from "../styles/common";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

export default function EditableList(props) {

    return(
        <View>
            <View style={{
                flexDirection: 'row',
                alignContent: 'center',
                paddingBottom: 10,
                borderBottomColor: 'white',
                borderBottomWidth: 1
            }}>
                <TextInput
                    placeholder='Nový typ'
                    value={props.newItemValue}
                    onChangeText={props.onChangeNewItemValue}
                    placeholderTextColor={props.placeholderColor}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderColor: 'white',
                        flex: 1,
                        borderRadius: 4,
                        marginRight: 30,
                        color: props.textColor ? props.textColor : "black"
                    }}
                >
                </TextInput>
                <View>
                <ButtonPrimary
                    icon='plus'
                    fillColor='white'
                    title='Přidat'
                    onPress={props.onAdd}
                >
                </ButtonPrimary>
                </View>
            </View>
            <FlatList
                persistentScrollbar={true}
                data={props.data}
                style={{
                    height: props.height
                }}
                renderItem={(i) => {
                    return (
                    <View style={{ 
                        borderColor: 'white', 
                        backgroundColor: props.backgroundColor ? props.backgroundColor : primaryColor,
                        borderWidth: 2, 
                        padding: 10, 
                        marginTop: 10, 
                        marginRight: 10,
                        borderRadius: 4, 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                        }}>

                        <Text style={{ fontSize: 16, color: props.textListColor ? props.textListColor : "black" }}>{i.item[props.labelField]}</Text>
                        <ButtonPrimary
                            fillColor={dangerColor}
                            textColor='white'
                            title='Odebrat'
                            onPress={() => { props.onRemove(i.item[props.idField]); }}
                        >
                        </ButtonPrimary>
                    </View>);
                }}
                keyExtractor={item => item[props.idField]}
            >
            </FlatList>
        </View>
    );
}