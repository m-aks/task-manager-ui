/*
import axios from 'axios';

export class ContactsService {

    url = process.env.SERVER_URL

    fetchContacts = async () =>{
        const res = await axios.get('${url}/contacts')
        console.log('fetch', res.data)
    }

    addContact = async (name,number) =>{
        const contact  = {
            name: name,
            number: number
        }
        const res = await axios.post('${url}/contacts', contact)
        console.log('add', res.data)
    }

    getContact = async id =>{
        const res = await axios.get('${url}/contacts/${id}')
        console.log('get', res.data)
    }

    editContact = async (id,name,number) => {
        const contact = {
            name: name,
            number: number
        }
        const res = await axios.put('${url}/contacts/${id}', contact)
        console.log('edit', res.data)
    }

    deleteContact = async id => {
        const res = await axios.delete('${url}/contacts/${id}')
        console.log('edit', res.data)
    }
}*/
