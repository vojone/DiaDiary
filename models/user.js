import Model from "./model";

export class User extends Model {
    static databaseType = 'user';

    /**
     * 
     * @param {Object} query 
     * @param {boolean} multiple 
     * @returns 
     */
    static async find(query = {}) {
        return super.find(User, query);
    }

    static async findById(id) {
        return super.findById(User, id);
    }

    static async remove(query, multiple = false) {
        return super.remove(User, query, multiple);
    }

    static async update(query, update) {
        return super.updateModel(User, query, update);
    }
    
    constructor({
        _id = undefined, 
        massUnit = null,
        insulineType = null,
        glycemiaUnit = null,
        name = null,
        inputType = 0} = {}) {

        super();   

        this._id = _id;
        this.massUnit = massUnit;
        this.insulineType = insulineType;
        this.glycemiaUnit = glycemiaUnit;
        this.name = name;
        this.inputType = inputType;
    }

    obj() {
        return {
            '_id' : this._id,
            'massUnit' : this.massUnit,
            'insulineType' : this.insulineType,
            'glycemiaUnit' : this.glycemiaUnit,
            'name' : this.name,
            'inputType' : this.inputType,
        };
    }
}