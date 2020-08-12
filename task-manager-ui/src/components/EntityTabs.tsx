import React, {Component} from 'react'
import {Tabs,Tab,Accordion,Spinner,Card} from 'react-bootstrap'
import {ContactCard} from "./ContactCard"
import {TaskCard} from "./TaskCard"
import axios from "axios"

export class EntityTabs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            tasks: null,
            contacts: null,
            relations: null
        }
    }

    //url = process.env.SERVER_URL
    url = "http://localhost:9000"

    render() {
        return (
            this.state.isLoading ?
                <Spinner animation="border"/> :
                <Tabs className="justify-content-center">
                    <Tab eventKey="tasks" title="Tasks">
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Planned
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div className="flex-cards">
                                            {this.state.tasks.filter(t => !t.isComplete).map((t: { id: string; }) => (
                                                <TaskCard
                                                    key={"task-" + t.id}
                                                    task={t}
                                                    contacts={this.state.contacts}
                                                    relations={
                                                        this.state.relations.filter(r => r.taskId === t.id)
                                                    }
                                                    onDelete={this.deleteTask}
                                                    onUpdate={this.updateTask}
                                                    onComplete={this.completeTask}
                                                />
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    Completed
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <div className="flex-cards">
                                            {this.state.tasks.filter(t => t.isComplete).map((t: { id: string; }) => (
                                                <TaskCard
                                                    key={"task-" + t.id}
                                                    task={t}
                                                    contacts={this.state.contacts}
                                                    relations={
                                                        this.state.relations.filter(r => r.taskId === t.id)
                                                    }
                                                    onDelete={this.deleteTask}
                                                    onUpdate={this.updateTask}
                                                    onComplete={this.completeTask}
                                                    onRelation={this.changeRelation}
                                                />
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Tab>
                    <Tab className="contacts-tab" eventKey="contacts" title="Contacts">
                        <div className="flex-cards">
                            {this.state.contacts.map((c:any) => (
                                <ContactCard
                                    key={"contact-" + c.id}
                                    contact={c}
                                    onDelete={this.deleteContact}
                                    onUpdate={this.updateContact}
                                />
                            ))}
                        </div>
                    </Tab>
                </Tabs>
        )
    }

    async componentDidMount() {
        this.setState({...this.state, isLoading: true})

        await axios.get(`${this.url}/tasks`)
            .then(response =>
                this.setState({
                    tasks: response.data.tasks
                }))
            .catch(e => console.log(e))

        await axios.get(`${this.url}/contacts`)
            .then(response =>
                this.setState({
                    contacts: response.data.contacts
                }))
            .catch(e => console.log(e))

        await axios.get(`${this.url}/relations`)
            .then(response =>
                this.setState({
                    relations: response.data.relations
                }))
            .catch(e => console.log(e))

        this.setState({...this.state, isLoading: false})
    }

    deleteContact = (id) => {
        axios.delete(`${this.url}/contacts/${id}`)
            .then(response => console.log(`delete contact id = ${id}`))
            .catch(e => console.log(e))

        this.setState({
            ...this.state,
            contacts: this.state.contacts.filter(c => c.id !== id)
        })
    }

    updateContact = (contact) => {
        console.log(contact)

        axios.put(`${this.url}/contacts/${contact.id}`, contact)
            .then(responce => console.log(`update contact id = ${contact.id}`))
            .catch(e => console.log(e))

        /*const i = this.state.contacts.findIndex(value => value.id === contact.id)

        this.state.contacts[i] = contact*/

        this.setState(
            {
            ...this.state,
            contacts: this.state.contacts.map(c => {
                if(c.id===contact.id){
                    c.name=contact.name
                    c.number=contact.number
                }
                return c
            })
        })
        console.log('state', this.state.contacts)
    }

    deleteTask = (id) => {
        axios.delete(`${this.url}/tasks/${id}`)
            .then(response => console.log(`delete task id = ${id}`))
            .catch(e => console.log(e))

        this.setState({
            ...this.state,
            tasks: this.state.tasks.filter(t => t.id !== id)
        })
    }

    updateTask = (task) => {
        console.log(task)

        //console.log('state-before', this.state.tasks)

        axios.put(`${this.url}/tasks/${task.id}`, task)
            .then(responce => console.log(`update task id = ${task.id}`))
            .catch(e => console.log(e))
        /*
                this.setState({
                    ...this.state,
                    tasks: this.state.tasks.map(t => {
                        if(t.id===task.id){
                            t.title=task.title
                            t.description=task.description
                            t.isComplete=task.isComplete
                        }
                    })
                })
                console.log('state-after', this.state.tasks)*/
    }

    completeTask = (task) => {
        this.updateTask({
            id: task.id,
            title: task.title,
            description: task.description,
            isComplete: true
        })
    }
}