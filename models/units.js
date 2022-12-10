import { store, get } from "../services/database";

export class Unit {
    static databaseType = 'units';

    /**
     * 
     * @param {Object} query 
     * @param {boolean} multiple 
     * @returns 
     */
    static async find(unitType, query = {}, multiple = false) {
        query.unitType = unitType;

        return get(Unit.databaseType, query).then(result => {
            if(result === null || result.length == 0) {
                return null;
            } 
            else {
                if(multiple) {
                    return result.map(record => {
                        return new Unit(record);
                    });
                }
                else {
                    let rec = new Unit(result[0]);
                    return rec;
                }
            }
        });
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

    async save() {
        toBeStored = this.obj();

        return store(Unit.databaseType, [toBeStored]).then(
            (added) => { return added[0]; },
            (err) => { console.error(err); return null; }
        );
    }
}