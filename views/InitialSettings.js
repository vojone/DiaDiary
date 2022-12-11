import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { primaryColor } from '../styles/common';

export default function InitSettingsScreen({ navigation }) {
    return (
        <View
            style={{ 
                backgroundColor: primaryColor
            }}
        >
            <Text>Vítejte!</Text>
            <Text>Jsem Váš diabetický deník a budu Vám pomáhat s Vaší nemocí...</Text>
            <Text>Nejdříve se ale musíme seznámit. Povězte mi, prosím, něco...</Text>
            <View>
            </View>
        </View>
    );
  }
  