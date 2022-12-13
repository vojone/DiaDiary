/**
 * Seeds the initial data to the storage (and/or demo data as well)
 * @author Vojtěch Dvořák (xdvora3o)
 */

import { Food } from "./models/food";
import { Tag } from "./models/tag";
import { Unit } from "./models/unit";
import { User } from "./models/user";
import { getAS, storeAS } from './services/store';

export async function seedUnits() {
    return Unit.remove({}, true).then((clearNum) => {
        console.log(`Cleared ${clearNum} units!`);

        return Unit.addUnits([
            new Unit({unitType: 'mass', label: 'g', isReference: true, title: 'g (gram)', resolution: 0}),
            new Unit({unitType: 'mass', label: 'oz', toReferenceCoef: 28.35, step: 0.1, title: 'oz (unce)', resolution: 1}),

            new Unit({unitType: 'glyc', label: 'mmol/l', isReference: true, step: 0.1, resolution: 1}),
            new Unit({unitType: 'glyc', label: 'mg/dL', toReferenceCoef: 0.055, resolution: 0}),
            
            new Unit({unitType: 'insuline', label: 'Fiasp', isReference: true, resolution: 0}),
            new Unit({unitType: 'insuline', label: 'Novorapid', resolution: 0}),
        ]);
    });
}


export async function seedFood() {
    return Food.remove({}, true).then((clearNum) => {
        console.log(`Cleared ${clearNum} food!`);

        return Food.addFood([
            new Food({label: 'Nejedl(a) jsem', order: -1}),
            new Food({label: 'Snídaně'}),
            new Food({label: 'Oběd'}),
            new Food({label: 'Večeře'}),
            new Food({label: 'Jiné', order: 2}),
        ]);
    });
}


export async function seedTags() {
    return Tag.remove({}, true).then((clearNum) => {
        console.log(`Cleared ${clearNum} tags!`);

        return Tag.addTags([
            new Tag({label: 'Sport'}),
            new Tag({label: 'Stres'}),
            new Tag({label: 'Práce'}),
        ]);
    });
}


export async function seedDemoUser() {
    return User.remove({}, true).then((clearNum) => {
        console.log(`Cleared ${clearNum} user settings!`);

        let massUnitProm = Unit.find('mass', {label: 'g'});
        let glycUnitProm = Unit.find('glyc', {label: 'mmol/l'});
        let insulineTProm = Unit.find('insuline', {label: 'Novorapid'});

        return Promise.allSettled([massUnitProm, glycUnitProm, insulineTProm])
            .then(([massU, glycU, insulineT]) => {
                if(massU.value == undefined || 
                    glycU.value == undefined || 
                    insulineT.value == undefined) {

                    console.error('Error while seeding user settings');
                    return;
                }

                let user = new User({
                    massUnit: massU.value, 
                    glycemiaUnit: glycU.value, 
                    insulineType: insulineT.value});

                user.save().then((user) => {
                    global.user = user;
                });
            });
    });
}