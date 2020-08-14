import {BaseService} from './BaseService'

export class RelationService extends BaseService{

    constructor() {
        super("/relations");
    }

}