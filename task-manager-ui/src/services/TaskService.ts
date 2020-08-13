import {BaseService} from './BaseService'

export class TaskService extends BaseService{

    constructor() {
        super("http://localhost:9000/tasks");
    }

}