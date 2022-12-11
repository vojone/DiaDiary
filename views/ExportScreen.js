import React from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import {selectDirectory} from 'react-native-directory-picker';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

function downloadFile(){
    const uri = "http://techslides.com/demos/sample-videos/small.mp4"
    let fileUri = FileSystem.documentDirectory + "small.mp4";
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        saveFile(uri);
      })
      .catch(error => {
        console.error(error);
      })
}

const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      FileSystem.saveFile(fileUri, "small.mp4")
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
}

function ExportScreen() {

  // function to handle exporting
  const exportDataToExcel = () => {

    // Create a file in the external storage
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'test.xlsx', 'Hello World', { encoding: FileSystem.EncodingType.UTF8 })
      .then((success) => {
        
        downloadFile();
        console.log('FILE WRITTEN!', FileSystem.documentDirectory + 'test.xlsx');
      })
      .catch((err) => {
        console.log(err.message);
      });    

  }
  const handleClick = async () => {

    try{
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if(!isPermitedExternalStorage){

        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage permission needed",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel();
          console.log("Permission granted");
        } else {
          // Permission denied
          console.log("Permission denied");
        }
      }else{
         // Already have Permission (calling our exportDataToExcel function)
         exportDataToExcel();
      }
    }catch(e){
      console.log('Error while checking permission');
      console.log(e);
      return
    }
    
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={() => handleClick()}
        style={{
          width: '50%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: 'blue',
          marginVertical: 20,
        }}>
        <Text style={{textAlign: 'center', color: 'white'}}>
          Export to Excel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExportScreen;