import axios from "axios";

export class BaseService {

    constructor(private url: string){}

    delete=(id:string)=>{
        return axios.delete(`${this.url}/${id}`)
    }

    update = (entity: any) => {
        return axios.put(`${this.url}/${entity.id}`, entity)
    }

    create = (entity: any) => {
        return axios.post(this.url, entity)
    }

    getAll = () => {
        return axios.get(this.url)
    }
}