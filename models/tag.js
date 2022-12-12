import { store } from "../services/database";
import Model from "./model";

export class Tag extends Model {
    static databaseType = 'tag';

    /**
     * 
     * @param {Object} query 
     * @param {boolean} multiple 
     * @returns 
     */
    static async find(query = {}, multiple = false, sort = null) {
        return super.find(Tag, query, multiple, sort);
    }

    static async findById(id) {
        return super.findById(Tag, id);
    }

    static async remove(query, multiple = false) {
        return super.remove(Tag, query, multiple);
    }

    static async update(query, update) {
        return super.updateModel(Tag, query, update);
    }

    static async addTags(tagArr) {
        let toBeStored = tagArr.map(t => {
            return t.obj();
        });

        return store(Tag.databaseType, toBeStored).then(
            (added) => { return added; },
            (err) => { console.error(err); return null; }
        );
    }

    constructor({
        _id = undefined, 
        label = null} = {}) {

        super();   

        this._id = _id;
        this.label = label;
    }

    obj() {
        return {
            '_id' : this._id,
            'label' : this.label,
        };
    }
}

