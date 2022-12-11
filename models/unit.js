import { store } from "../services/database";
import Model from "./model";

export class Unit extends Model {
    static databaseType = 'unit';

    /**
     * 
     * @param {Object} query 
     * @param {boolean} multiple 
     * @returns 
     */
    static async find(unitType, query = {}, multiple = false, sort = null) {
        query.unitType = unitType;

        return super.find(Unit, query, multiple, sort);
    }

    static async findById(id) {
        return super.findById(Unit, id);
    }

    static async remove(query, multiple = false) {
        return super.remove(Unit, query, multiple);
    }

    static async update(query, update) {
        return super.update(Unit, query, update);
    }

    static async addUnits(unitArr) {
        let toBeStored = unitArr.map(en => {
            return en.obj();
        });

        return store(Unit.databaseType, toBeStored).then(
            (added) => { return added; },
            (err) => { console.error(err); return null; }
        );
    }

    constructor({
        _id = undefined, 
        unitType = null,
        label = null,
        isReference = null, 
        toReferenceCoef = null,
        step = 1,
        title = null} = {}) {

        super();   

        this._id = _id;
        this.unitType = unitType;
        this.label = label;
        this.isReference = isReference;
        this.toReferenceCoef = toReferenceCoef;
        this.step = step;
        this.title = title;
    }

    obj() {
        return {
            '_id' : this._id,
            'unitType' : this.unitType,
            'label' : this.label,
            'isReference' : this.isReference,
            'toReferenceCoef' : this.toReferenceCoef,
            'step' : this.step,
            'title' : this.title,
        };
    }
}