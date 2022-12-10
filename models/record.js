import { store, get, remove, removeAll } from "../services/database";
import Model from "./model";

/**
 * 
 */
export class Record extends Model {
    static databaseType = 'record';

    /**
     * 
     * @param {Object} query 
     * @param {boolean} multiple 
     * @returns 
     */
    static async find(query, multiple = false) {
        return super.find(Record, query, multiple);
    }

    /**
     * 
     * @param {string} id 
     * @returns 
     */
    static async findById(id) {
        return super.findById(Record, id);
    }

    static async remove(query, multiple = false) {
        return super.remove(Record, query, multiple);
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

    constructor({
        _id = undefined, 
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

        super();

        this._id = _id;
        
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

    async save() {
        return super.save();
    }
}
