import { store } from "../services/database";
import Model from "./model";

export class Unit extends Model {
    static databaseType = 'units';

    /**
     * 
     * @param {Object} query 
     * @param {boolean} multiple 
     * @returns 
     */
    static async find(unitType, query = {}, multiple = false) {
        query.unitType = unitType;

        return super.find(Record, query, multiple);
    }

    static async addUnits(unitArr) {
        toBeStored = unitArr.map(unit => {
            return unit.obj();
        });

        return store(Unit.databaseType, toBeStored).then(
            (added) => { return added; },
            (err) => { console.error(err); return null; }
        );
    }

    constructor({
        id = undefined, 
        unitType = null,
        value = null,
        label = null,
        isPrimary = null, 
        isReference = null, 
        toReferenceCoef = null} = {}) {

        this._id = id;
        this.unitType = unitType;
        this.value = value;
        this.label = label;
        this.isPrimary = isPrimary;
        this.isReference = isReference;
        this.toReferenceCoef = toReferenceCoef;
    }

    obj() {
        return {
            '_id' : this._id,
            'unitType' : this.unitType,
            'value' : this.value,
            'label' : this.label,
            'isPrimary' : this.isPrimary,
            'isReference' : this.isReference,
            'toReferenceCoef' : this.toReferenceCoef,
        };
    }

    setPrimary(isPrimary = true) {
        this.isPrimary = isPrimary;
    }
}