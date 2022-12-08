import { store, get } from "../services/database";

/**
 * 
 */
export class Record {
    static databaseType = 'record';

    /**
     * 
     * @param {Object} query 
     * @param {boolean} multiple 
     * @returns 
     */
    static async find(query, multiple = false) {
        return get(Record.databaseType, query).then(result => {
            if(result === null || result.length == 0) {
                return null;
            } 
            else {
                if(multiple) {
                    return result.map(record => {
                        return new Record({templateObj : record});
                    });
                }
                else {
                    let rec = new Record({templateObj : result[0]});
                    return rec;
                }
            }
        });
    }

    /**
     * 
     * @param {string} id 
     * @returns 
     */
    static findById(id) {
        return get(Record.databaseType, {_id: id}).then(result => {
            if(result === null || result.length == 0) {
                return null;
            } 
            else {
                return new Record({templateObj : result[0]});
            }
        });
    }

    static default() {
        return new Record({
            bloodSugar: 5.5, 
            insuline: null, 
            insulineU: null,
            dateTime: new Date(),
        }); 
    }

    /**
     * 
     * @param {Object} param0 
     */
    constructor({
        id = undefined, 
        key = null, 
        bloodSugar = null, 
        insuline = null, 
        insulineU = null, 
        carboHydrates = null,
        carboHydratesU = null,
        dateTime = null, 
        templateObj = null} = {}) {

        if(templateObj) {
            this._id = templateObj.id;
            this.key = templateObj.key;
            this.insuline = templateObj.insuline;
            this.insulineU = templateObj.insulineU;
            this.carboHydrates = templateObj.carboHydrates;
            this.carboHydratesU = templateObj.carboHydratesU;
            this.dateTime = templateObj.dateTime;
        }
        else {
            this._id = id;
            this.key = key;
            this.bloodSugar = bloodSugar;
            this.insuline = insuline;
            this.insulineU = insulineU;
            this.carboHydrates = carboHydrates;
            this.carboHydratesU = carboHydratesU;
            this.dateTime = dateTime;
        }
    }


    obj() {
        return {
            '_id' : this._id,
            'key' : this.key,
            'bloodSugar' : this.bloodSugar,
            'insuline' : this.insuline,
            'insulineU' : this.insulineU,
            'dateTime' : this.dateTime,
        };
    }

    /**
     * 
     * @param {Object} props 
     */
    setProperties(props) {
        for(const key in props) {
            if(this[key] !== undefined) {
                this[key] = props[key];
            }
        }
    }


    async save() {
        toBeStored = this.obj();

        return store(Record.databaseType, [toBeStored]).then(
            (added) => { return added[0]; },
            (err) => { console.error(err); return null; }
        );
    }
}
