import axios from "axios";

export class BaseService {

    constructor(private url: string){}

    serverUrl = "http://localhost:9000"

    delete=(id:string)=>{
        return axios.delete(`${this.serverUrl}${this.url}/${id}`)
    }

    update = (entity: any) => {
        return axios.put(`${this.serverUrl}${this.url}/${entity.id}`, entity)
    }

    create = (entity: any) => {
        return axios.post(`${this.serverUrl}${this.url}`, entity)
    }

    getAll = () => {
        return axios.get(`${this.serverUrl}${this.url}`)
    }
}