/**
 * Declaration of global variables
 * @author Vojtěch Dvořák (xdvora3o)
 */


import { Food } from "./models/food";
import { Tag } from "./models/tag";
import { Unit } from "./models/unit";
import { User } from "./models/user";
import { seedDemoUser, seedFood, seedTags, seedUnits } from "./seeder";
import { getAS, storeAS } from './services/store';

global.user = {};
global.firstLaunch = false;
global.settingsChanged = false;

/**
 * Seeds the data to the app (if it is necessary)
 * @param {*} navigationRef 
 * @param {*} clearData 
 * @param {*} seedDemoData 
 */
export default function seedData(navigationRef, clearData, seedDemoData = false) {
    console.log('Intialization');
    getAS('initialized').then((result) => {
        if(result === null || clearData) {
            global.firstLaunch = true;

            let unitsProm = seedUnits();
            let foodProm = seedFood();
            let tagProm = seedTags();

            Promise.allSettled([unitsProm, foodProm, tagProm]).then(
                ([units, food, tag]) => {
                    if(seedDemoData) {
                        seedDemoUser().then((user) => {
                            global.user = user;
                            global.settingsChanged = !global.settingsChanged;

                        });
                    }
                    else {
                        // console.log(units);
                        // console.log(food);
                        // console.log(tag);
                        navigationRef.current?.navigate('InitialSettings');
                    }
            });
        }
        else {
            User.find({}).then((user) => {
                global.user = user;
                global.settingsChanged = !global.settingsChanged;

                navigationRef.current?.navigate('Records');
            },
            (error) => {
                console.error(error);
            });
        }

        storeAS('initialized', {init: true});
    });
} 