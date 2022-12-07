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

    /**
     * 
     * @param {Object} param0 
     */
    constructor({id = undefined, key = null, bloodSugar = null, templateObj = null} = {}) {
        if(templateObj) {
            this._id = templateObj.id;
            this.key = templateObj.key;
            this.bloodSugar = templateObj.bloodSugar;
        }
        else {
            this._id = id;
            this.key = key;
            this.bloodSugar = bloodSugar;
        }
    }


    obj() {
        return {
            '_id' : this._id,
            'key' : this.key,
            'bloodSugar' : this.bloodSugar, 
        };
    }


    async save() {
        toBeStored = this.obj();

        return store(Record.databaseType, [toBeStored]).then(
            (added) => { return added[0]; },
            (err) => { console.error(err); return null; }
        );
    }
}
