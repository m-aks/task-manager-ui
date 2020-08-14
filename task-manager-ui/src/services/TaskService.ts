import {BaseService} from './BaseService'

export class TaskService extends BaseService{

    constructor() {
        super("/tasks");
    }

}