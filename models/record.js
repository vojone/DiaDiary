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
    static async find(query, multiple = false, sort = null) {
        return super.find(Record, query, multiple, sort);
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

    static async update(query, update) {
        return super.update(Record, query, update);
    }

    static default() {
        return new Record({
            bloodSugar: 5.5,
            bloodSugarU : { _id: '1', label: 'mmol/l'}, 
            insuline: null, 
            insulineT: { _id: '1', label: 'Fiasp'},
            carbo: null,
            carboU: { _id: '1', label: 'g'},
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
        insulineT = null, 
        carbo = null,
        carboU = null,
        dateTime = null,
        food = null,
        tags = null,
        note = null} = {}) {

        super();

        this._id = _id;
        
        this.bloodSugar = bloodSugar;
        this.bloodSugarU = bloodSugarU;
        this.insuline = insuline;
        this.insulineT = insulineT;
        this.carbo = carbo;
        this.carboU = carboU;
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
            'insulineT' : this.insulineT,
            'dateTime' : this.dateTime,
            'carbo' : this.carbo,
            'carboU' : this.carboU,
            'food' : this.food,
            'tags' : this.tags,
            'note' : this.note,
        };
    }
}
