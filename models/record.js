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
                        return new Record(record);
                    });
                }
                else {
                    let rec = new Record(result[0]);
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
                return new Record(result[0]);
            }
        });
    }

    static default() {
        return new Record({
            bloodSugar: 5.5,
            bloodSugarU : { value: '1', label: 'mmol/l'}, 
            insuline: null, 
            insulineU: { value: '1', label: 'Fiasp'},
            carboHydrates: null,
            carboHydratesU: { value: '1', label: 'g'},
            dateTime: new Date(),
            food: null,
            tags: [],
            note: '',
        }); 
    }

    /**
     * 
     * @param {Object} param0 
     */
    constructor({
        id = undefined, 
        bloodSugar = null, 
        bloodSugarU = null,
        insuline = null, 
        insulineU = null, 
        carboHydrates = null,
        carboHydratesU = null,
        dateTime = null,
        food = null,
        tags = null,
        note = null} = {}) {

        this._id = id;
        this.bloodSugar = bloodSugar;
        this.bloodSugarU = bloodSugarU;
        this.insuline = insuline;
        this.insulineU = insulineU;
        this.carboHydrates = carboHydrates;
        this.carboHydratesU = carboHydratesU;
        this.food = food;
        this.tags = tags;
        this.note = note;
        this.dateTime = dateTime;
    }


    obj() {
        return {
            '_id' : this._id,
            'bloodSugar' : this.bloodSugar,
            'bloodSugarU' : this.bloodSugarU,
            'insuline' : this.insuline,
            'insulineU' : this.insulineU,
            'dateTime' : this.dateTime,
            'carboHydrates' : this.carboHydrates,
            'carboHydratesU' : this.carboHydratesU,
            'food' : this.food,
            'tags' : this.tags,
            'note' : this.note,
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
