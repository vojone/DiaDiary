import { store, get, remove, update, removeAll } from "../services/database";

export default class Model {

    static async find(targetCls, query, multiple = false, sort = null) {
        return get(targetCls.databaseType, query, sort).then(result => {
            if(result === null || result.length == 0) {
                return null;
            } 
            else {
                if(multiple) {
                    return result.map(record => {
                        return new targetCls(record);
                    });
                }
                else {
                    return new targetCls(result[0]);
                }
            }
        });
    }

    static async findById(targetCls, id) {
        return get(targetCls.databaseType, {_id: id}).then(result => {
            if(result === null || result.length == 0) {
                return null;
            } 
            else {
                return new targetCls(result[0]);
            }
        });
    }

    static async remove(targetCls, query, multiple = false) {
        let removeFunc = multiple ? removeAll : remove;

        return removeFunc(targetCls.databaseType, query).then(result => {
            return result;
        });
    }

    static async updateModel(targetCls, query, upd) {
        return update(targetCls.databaseType, query, upd).then(result => {
            return result;
        });
    }

    constructor() {
        if(this.constructor === Model) {
            throw new Error('Model class is abstract class!');
        }
    }

    setProperties(props) {
        for(const key in props) {
            if(this[key] !== undefined) {
                this[key] = props[key];
            }
        }
    }

    async save() {
        let toBeStored = this.obj();

        return store(this.constructor.databaseType, [toBeStored]).then(
            (added) => { return added[0]; },
            (err) => { console.error(err); return null; }
        );
    }
}