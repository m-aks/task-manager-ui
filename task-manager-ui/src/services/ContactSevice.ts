import {BaseService} from './BaseService'

export class ContactService extends BaseService{

    constructor() {
        super("/contacts");
    }

}