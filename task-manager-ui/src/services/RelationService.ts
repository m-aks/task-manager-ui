import {BaseService} from './BaseService'

export class RelationService extends BaseService{

    constructor() {
        super("http://localhost:9000/relations");
    }

}