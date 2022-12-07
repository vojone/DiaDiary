import Datastore from "react-native-local-mongodb";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * More effective than pure AsyncStorage in store.js (for more info see 
 * https://www.npmjs.com/package/react-native-local-mongodb)
 */

const db = new Datastore({ filename: 'asyncStorageKey', storage: AsyncStorage, autoload: true});

// db.loadDatabase(function (err) {  
//     console.error(err);    
// });

/**
 * 
 * @param {string} type 
 * @param {Object} toBeStored 
 * @returns 
 */
export async function store(type, toBeStored) {
    toBeStored.forEach(element => {
        element._type = type;
    });

    return new Promise((resolve, reject) => {
        db.insert(toBeStored, (err, newDocs) => {
            if(err) return reject(err);
            resolve(newDocs);
        });
    });
}


/**
 * 
 * @param {string} type 
 * @param {Object} query 
 * @returns 
 */
export async function get(type, query) {
    query._type = type;

    return new Promise((resolve, reject) => {
        db.find(query, (err, docs) => {
            if(err) return reject(err);
            resolve(docs);
        });
    });
}



/**
 * 
 * @param {string} type 
 * @param {Object} query 
 * @returns 
 */
export async function remove(type, query) {
    query._type = type;

    return new Promise((resolve, reject) => {
        db.remove(query, {}, (err, num) => {
            if(err) return reject(err);
            resolve(num);
        });
    });
}


/**
 * 
 * @param {string} type 
 * @returns 
 */
export async function clear(type) {
    query._type = type;

    return new Promise((resolve, reject) => {
        db.remove({}, {multi: true}, (err, num) => {
            if(err) return reject(err);
            resolve(num);
        });
    });
}

