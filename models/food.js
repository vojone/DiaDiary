import { store } from "../services/database";
import Model from "./model";

export class Food extends Model {
    static databaseType = 'food';

    /**
     * 
     * @param {Object} query 
     * @param {boolean} multiple 
     * @returns 
     */
    static async find(query = {}, multiple = false, sort = null) {
        return super.find(Food, query, multiple, sort);
    }

    static async findById(id) {
        return super.findById(Food, id);
    }

    static async remove(query, multiple = false) {
        return super.remove(Food, query, multiple);
    }

    static async update(query, update) {
        return super.updateModel(Food, query, update);
    }

    static async addFood(foodArr) {
        let toBeStored = foodArr.map(f => {
            return f.obj();
        });

        return store(Food.databaseType, toBeStored).then(
            (added) => { return added; },
            (err) => { console.error(err); return null; }
        );
    }

    constructor({
        _id = undefined, 
        label = null,
        order = 0} = {}) {

        super();   

        this._id = _id;
        this.label = label;
        this.order = order;
    }

    obj() {
        return {
            '_id' : this._id,
            'label' : this.label,
            'order' : this.order,
        };
    }
}