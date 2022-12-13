/**
 * Screen with export button for exporting data to CSV
 * @authors Juraj Dedič (xdedic07), Vojtěch Dvořák (xdvora3o)
 */

import React, { useState } from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import {selectDirectory} from 'react-native-directory-picker';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import ButtonPrimary from '../components/ButtonPrimary';
import { primaryColor, primaryColor2 } from '../styles/common';
import { Record } from '../models/record';
import { showToastMessageDanger, showToastMessageSuccess } from '../components/ToastMessage';
import { StorageAccessFramework } from 'expo-file-system';

/**
 * Converts array of records to CSV string
 * @param {array} arr 
 * @returns string 
 */
//Based on https://dev.to/samueldjones/convert-an-array-of-objects-to-csv-string-in-javascript-337d
function convertToCSV(arr) {
    const CSVString = [
        [
            'Datum',
            'Cas',
            'Glykemie',
            'Glykemie - jednotky',
            'Inzulin',
            'Inzulin - typ',
            'Sacharidy',
            'Sacharidy - jednotky',
            'Poznamky',
        ],
        ...arr.map(rec => {
            let dateTime = new Date(rec.dateTime);
            //console.log(dateTime);
            return [
            `${dateTime.getDate()}. ${dateTime.getMonth()}. ${dateTime.getFullYear()}`,
            `${dateTime.getHours()}:${dateTime.getMinutes() < 10 ? '0' : ''}${dateTime.getMinutes()}:${dateTime.getSeconds() < 10 ? '0' : ''}${dateTime.getSeconds()}`,
            rec.bloodSugar ? rec.bloodSugar : '',
            rec.bloodSugar ? rec.bloodSugarU.label : '',
            rec.insuline ? rec.insuline : '',
            rec.insuline ? rec.insulineT.label : '',
            rec.carbo ? rec.carbo : '',
            rec.carbo ? rec.carboU.label : '',
            rec.note,
            ];
        }),
    ].map(row => row.join(',')).join('\n');

    return CSVString;
}


/**
 * Export screen functional component
 * @returns 
 */
export default function ExportScreen(directoryUri) {

    const [isExporting, setIsExporting] = useState(false);

    //Export processing
    const exportRecords = async () => {
        console.log('Exporting...');

        //Let user choose the directory
        const directoryPermission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if(directoryPermission.granted) {
            //Ok
        }
        else{
            showToastMessageDanger('Nemám potřebná oprávnění pro export dat!');
            return;
        }

        Record.find({}, true).then(
            async (records) => {
                let currentDate = new Date();

                let CSV = convertToCSV(records);
                let fileName = `DiaDiary_${currentDate.getDate()}_${currentDate.getMonth()}_${currentDate.getFullYear()}_${currentDate.getHours()}_${currentDate.getMinutes()}_${currentDate.getUTCSeconds()}`;

                await StorageAccessFramework.createFileAsync(directoryPermission.directoryUri, fileName, 'text/csv')
                    .then(async(uri) => {
                        await FileSystem.writeAsStringAsync(uri, CSV, { encoding: FileSystem.EncodingType.UTF8 });
                        showToastMessageSuccess(`Záznamy byly úspěšně exportovány jako ${fileName}.csv`);
                    })
                    .catch((e) => {
                        console.error(e);
                        showToastMessageDanger('Nepodařilo se exportovat záznamy!');
                    });
        },
        error => {
            console.error(error);
            showToastMessageDanger('Nepodařilo se exportovat záznamy!');
        });
    }

    //Button tap callback
    const onExport = async () => {
        setIsExporting(true);

        try{

            let libPermit = false;
            let storagePermit = false;

            //We need external storage permission first
            let isPermited = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if(!isPermited) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Nejdříve mi musíte povolit přístup k úložišti',
                        buttonNeutral: 'Později',
                        buttonNegative: 'Zakázat',
                        buttonPositive: 'Povolit'
                    }
                );
                
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    storagePermit = true;
                } 
                else {
                    storagePermit = false;
                }
            }
            else{
                storagePermit = true;
            }


            if(storagePermit) {
                //All necessary permissions are granted!
                exportRecords();
            }
            else {
                showToastMessageDanger('Nemám potřebná oprávnění pro export dat!');
            }

            setIsExporting(false);
        }
        catch(e){
            showToastMessageDanger('Nepodařilo se ověřit oprávnění aplikace!');
            console.log('Unable to check permission!');
            console.error(e);

            setIsExporting(false);
            return;
        }
    };

    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
            }}>
            <ButtonPrimary
                textColor="white"
                icon="export"
                fillColor={primaryColor}
                title="Exportovat záznamy"
                onPress={onExport}
                loading={isExporting}
                disabled={isExporting}
            >
            </ButtonPrimary>

            <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{ color: primaryColor2 }}>
                    Pozn.: Tato verze aplikace podporuje pouze export záznamů pouze ve formátu CSV.
                </Text>

            </View>
        </View>
    );
};

