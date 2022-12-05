import AsyncStorage from '@react-native-async-storage/async-storage'


export async function store(key, data) {
    try {
        let jsonedData = JSON.stringify(data);
        await AsyncStorage.setItem(`@${key}`, jsonedData);
    }
    catch (e) {
        console.error(e);
    }
}

export async function get(key) {
    try {
        let rawData = await AsyncStorage.getItem(`@${key}`);
        if(rawData === null) {
            console.log('Data with given key were not saved yet!');
            AsyncStorage.getAllKeys().then(result => console.log(result));
            return null;
        }

        let data = JSON.parse(rawData);

        return data;
    }
    catch (e) {
        console.error(e);
    }
}

export async function remove(key) {
    try {
        await AsyncStorage.removeItem(`@${key}`);
    }
    catch (e) {
        console.error(e);
    }
}


export async function clear() {
    try {
        await AsyncStorage.clear();
    }
    catch (e) {
        console.error(e);
    }
}
