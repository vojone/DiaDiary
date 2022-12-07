import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './views/HomeScreen';
import HistoryScreen from './views/HistoryScreen';
import EntryDetail from './views/EntryDetail';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="EntryDetail" component={EntryDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}