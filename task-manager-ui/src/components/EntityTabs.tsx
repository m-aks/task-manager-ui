import React, {Component} from 'react'
import {Tabs, Tab, Accordion, Spinner, Card, Button} from 'react-bootstrap'
import {ContactCard} from "./ContactCard"
import {TaskCard} from "./TaskCard"
import axios from "axios"
import {ContactMenu} from "./ContactMenu";
import {TaskMenu} from "./TaskMenu";

export class EntityTabs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            tasks: null,
            contacts: null,
            relations: null,
            showContactMenu: false,
            showTaskMenu: false
        }
    }

    handleClose = () => {
        this.setState({showContactMenu: false, showTaskMenu:false})
    }

    handleShowContactMenu = () => {
        this.setState({showContactMenu: true})
    }

    handleShowTaskMenu = () => {
        this.setState({showTaskMenu: true})
    }

    //url = process.env.SERVER_URL
    url = "http://localhost:9000"

    render() {
        return (
            this.state.isLoading ?
                <Spinner animation="border"/> :
                <>
                    <Tabs className="justify-content-center">
                        <Tab className="tasks-tab" eventKey="tasks" title="Tasks">
                            <Accordion defaultActiveKey="0">
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        Planned
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <div className="flex-cards">
                                                <Button
                                                    style={{margin: "10px"}}
                                                    onClick={e => this.handleShowTaskMenu()}
                                                > Add<br/>new </Button>
                                                {this.state.tasks.filter(t => !t.isComplete).map(t => (
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
                                                {this.state.tasks.filter(t => t.isComplete).map(t => (
                                                    <TaskCard
                                                        key={"task-" + t.id}
                                                        task={t}
                                                        contacts={this.state.contacts}
                                                        relations={
                                                            this.state.relations
                                                                .filter(r => r.taskId === t.id)
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
                            </Accordion>
                        </Tab>
                        <Tab className="contacts-tab" eventKey="contacts" title="Contacts">
                            <div className="flex-cards">
                                <Button
                                    style={{margin: "10px"}}
                                    onClick={e => this.handleShowContactMenu()}
                                > Add<br/>new </Button>
                                {this.state.contacts.map(c => (
                                    <ContactCard
                                        key={"contact-" + c.id}
                                        contact={c}
                                        onDelete={this.deleteContact}
                                        onUpdate={this.updateContact}
                                        onCreate={this.createContact}
                                    />
                                ))}
                            </div>
                        </Tab>
                    </Tabs>
                    <ContactMenu
                        contact={{
                            id: 0,
                            name: '',
                            number: ''
                        }}
                        onClose={this.handleClose}
                        onSave={this.createContact}
                        isOpen={this.state.showContactMenu}
                    />
                    <TaskMenu
                        task={{
                            id: 0,
                            title: '',
                            description: '',
                            isComplete: false
                        }}
                        contacts={this.state.contacts}
                        relations={this.state.relations.filter(r => r.taskId === 0)}
                        onClose={this.handleClose}
                        onSave={this.createTask}
                        isOpen={this.state.showTaskMenu}
                    />
                </>
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
            .then(response => {
                this.setState({
                    ...this.state,
                    contacts: this.state.contacts.filter(c => c.id !== id)
                })
            })
            .catch(e => console.log(e))
    }

    updateContact = (contact) => {
        axios.put(`${this.url}/contacts/${contact.id}`, contact)
            .then(responce => {
                const i = this.state.contacts.findIndex(value => value.id === contact.id)
                let newContacts = this.state.contacts
                newContacts[i] = contact

                this.setState({
                    ...this.state,
                    contacts: newContacts
                })
            })
            .catch(e => console.log(e))
    }

    createContact = (contact) => {
        axios.post(`${this.url}/contacts`, contact)
            .then(response => {
                let newContacts = this.state.contacts
                newContacts.push(contact)
                this.setState({
                    contacts: newContacts
                })
            })
            .catch(e => console.log(e))
    }

    deleteTask = (id) => {
        axios.delete(`${this.url}/tasks/${id}`)
            .then(response => {
                this.setState({
                    ...this.state,
                    tasks: this.state.tasks.filter(t => t.id !== id)
                })
            })
            .catch(e => console.log(e))
    }

    updateTask = (task) => {
        axios.put(`${this.url}/tasks/${task.id}`, task)
            .then(responce => {
                const i = this.state.tasks.findIndex(value => value.id === task.id)
                let newTasks = this.state.tasks
                newTasks[i] = task
                this.setState({
                    ...this.state,
                    tasks: newTasks
                })
            })
            .catch(e => console.log(e))
    }

    completeTask = (task) => {
        this.updateTask({
            id: task.id,
            title: task.title,
            description: task.description,
            isComplete: true
        })
    }

    createTask = (task) => {
        axios.post(`${this.url}/tasks`, task)
            .then(response => {
                let newTasks = this.state.tasks
                newTasks.push(task)
                this.setState({
                    tasks: newTasks
                })
            })
            .catch(e => console.log(e))
    }
}