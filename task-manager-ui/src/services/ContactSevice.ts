import {BaseService} from './BaseService'

export class ContactService extends BaseService{

    constructor() {
        super("http://localhost:9000/contacts");
    }

}