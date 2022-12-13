/**
 * About screen component
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Linking, StyleSheet } from "react-native";
import { backgroundColor, backgroundColor2, primaryColor, primaryColor2, settingStyles } from "../styles/common";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const localstyles = StyleSheet.create({
    emphPar : {
        fontSize: 16,
        color: 'white', 
        fontWeight: 'bold', 
        marginVertical: 10,
    }
});

const styles = settingStyles;
export default function AboutScreen() {
    return (
        <LinearGradient colors={[primaryColor2, primaryColor]} style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                <Text style={styles.mainheading}><MaterialCommunityIcons name="information" color="white" size={28}></MaterialCommunityIcons>  O aplikaci</Text>
                <Text style={styles.regular}>
                    Tato aplikace slouží jako diabetický deník pro diabetiky prvního a druhého typu. 
                    Můžeš si zde zaznamenávat hladinu krevního cukru, množství podaného inzulínu a množství sacharidů v tvojí stravě.
                    K záznamům si můžeš přidat také dodatečné informace prostřednictvím poznámek a značek (tagů).
                    Tyto údaje si pak můžeš zpětně prohlížet nebo je můžeš zpětně editovat (pokud třeba uděláš chybu).
                    Až budeš chtít můžeš si je také nechat vyexportovat.
                </Text>
                <Text style={localstyles.emphPar}>
                    Pokud jsi "diabetik začátečník" poraď se nejdříve se svým lékařem a zjisti, proč jsou pro tebe tyto údaje důležité. 
                </Text>
                <Text style={{...styles.heading, marginTop: 20 }}>Autoři</Text>
                <Text style={styles.regular}>
                    Tato aplikace vznikla jako projekt do předmětu Tvorba uživatelských rozhraní na VUT FIT. 
                    Jejímy autory jsou Vojtěch Dvořák, Juraj Dedič a Tomáš Dvořák.
                </Text>
                <Text style={localstyles.emphPar}>
                    Pro více informací navštivte Github repozitář tohoto projektu: 
                    <View>
                        <Text style={{ ...localstyles.emphPar, flex: 1, textDecorationLine: 'underline' }} onPress={() => { Linking.openURL('https://github.com/vojone/DiaDiary') }}>
                            https://github.com/vojone/DiaDiary
                        </Text>
                    </View>
                </Text>
            </View>
        </LinearGradient>
    );
}