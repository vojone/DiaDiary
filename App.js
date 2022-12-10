import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import BottomNavigator from './components/BottomNavigator';
import MainDrawerNavigator from './components/MainNavigator';
import { Food } from './models/food';
import { Tag } from './models/tag';
import { Unit } from './models/unit';
import { getAS, storeAS } from './services/store';

const clearEnums = true;


export default function App() {
    useEffect(() => {
        console.log('initialization called');
        getAS('initialized').then((result) => {
            if(result !== null && clearEnums) {
                Unit.remove({}, true).then((clearNum) => {
                    console.log(`Cleared ${clearNum} units!`);
                });

                Food.remove({}, true).then((clearNum) => {
                    console.log(`Cleared ${clearNum} food!`);
                });

                Tag.remove({}, true).then((clearNum) => {
                    console.log(`Cleared ${clearNum} tags!`);
                });
            }
    
            if(result === null || clearEnums) {
                Unit.addUnits([
                    new Unit({unitType: 'mass', label: 'g', isReference: true}),
                    new Unit({unitType: 'mass', label: 'oz', toReferenceCoef: 28.35}),
    
                    new Unit({unitType: 'glyc', label: 'mmol/l', isReference: true}),
                    new Unit({unitType: 'glyc', label: 'mg/dL', toReferenceCoef: 0.055}),
                    
                    new Unit({unitType: 'insuline', label: 'Fiasp', isReference: true}),
                    new Unit({unitType: 'insuline', label: 'Novorapid'}),
                ]);

                Food.addFood([
                    new Food({label: 'Nejedl(a) jsem', order: -1}),
                    new Food({label: 'Snídaně'}),
                    new Food({label: 'Oběd'}),
                    new Food({label: 'Večeře'}),
                    new Food({label: 'Jiné', order: 2}),
                ]);
                
                Tag.addTags([
                    new Tag({label: 'Sport'}),
                    new Tag({label: 'Stres'}),
                    new Tag({label: 'Práce'}),
                ]);
    
                storeAS('initialized', { init: true });
            }
        });
    }, [clearEnums]);

    const styles = StyleSheet.create({
        main: {
            width: '100%',
            height: '100%',
        },
    });

    return (
        <View style={styles.main}>
            <NavigationContainer>
                <MainDrawerNavigator/>
            </NavigationContainer>
        </View>
    );
}