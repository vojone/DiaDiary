import { store, get } from "../store";


export class Record {
    static storeKey = 'records';

    static async find(id) {
        return get(`${Record.storeKey}.${id}`).then(result => {
            if(result === null) {
                return result;
            } 
            else {
                return new Record({templateObj_ : result});
            }
        });
    }

    constructor({id_ = null, bloodSugar_ = null, templateObj_ = null} = {}) {
        if(templateObj_) {
            this.id = templateObj_.id;
            this.bloodSugar = templateObj_.bloodSugar;
        }
        else {
            this.id = id_;
            this.bloodSugar = bloodSugar_;
        }
    }

    obj() {
        return {
            'id' : this.id,
            'bloodSugar' : this.bloodSugar, 
        };
    }

    async save() {
        toBeStored = this.obj();

        if(toBeStored.id === null) {

            let i = 0;
            while(await Record.find(i) !== null) {
                i++;
            }
            
            toBeStored.id = i;
        }

        store(`${Record.storeKey}.${toBeStored.id}`, toBeStored);

        return toBeStored.id;
    }
}