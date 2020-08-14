import React, {Component} from 'react'
import {Tabs, Tab, Accordion, Spinner, Card, Button} from 'react-bootstrap'
import {ContactCard} from "./ContactCard"
import {TaskCard} from "./TaskCard"
import {ContactMenu} from "./ContactMenu"
import {TaskMenu} from "./TaskMenu"
import {ContactService} from '../services/ContactSevice'
import {TaskService} from "../services/TaskService";
import {RelationService} from "../services/RelationService";

interface EntityTabsState {
    isLoading: boolean
    tasks: Task[]
    contacts: Contact[]
    relations: Relation[]
    showContactMenu: boolean
    showTaskMenu: boolean
}

export type Task = {
    id: number
    title: string
    description: string
    isComplete: boolean
}

export type Contact = {
    id: number
    name: string
    number: string
}

export type Relation = {
    taskId: number
    contactId: number
}

export class EntityTabs extends Component<{},EntityTabsState> {

    state = {
        isLoading: true,
        tasks: [],
        contacts: [],
        relations: [],
        showContactMenu: false,
        showTaskMenu: false
    }

    taskService = new TaskService()
    contactService = new ContactService()
    relationService = new RelationService()

    handleClose = () => {
        this.setState({showContactMenu: false, showTaskMenu:false})
    }

    handleShowContactMenu = () => {
        this.setState({showContactMenu: true})
    }

    handleShowTaskMenu = () => {
        this.setState({showTaskMenu: true})
    }

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
                                                    onClick={() => this.handleShowTaskMenu()}
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

        await this.taskService.getAll().then(response =>
                this.setState({
                    tasks: response.data.tasks
                })
        )

        await this.contactService.getAll().then(response =>
                this.setState({
                    contacts: response.data.contacts
                })
        )

        await this.relationService.getAll().then(response =>
                this.setState({
                    relations: response.data.relations
                })
        )

        this.setState({...this.state, isLoading: false})
    }

    deleteContact = (id:number) => {
        this.contactService.delete(`${id}`).then(()=>{
            this.setState({
                ...this.state,
                contacts: this.state.contacts.filter(c => c.id !== id)
            })
        })
    }

    updateContact = (contact: Contact) => {
        this.contactService.update(contact)
            .then(() => {
                const i = this.state.contacts.findIndex(value => value.id === contact.id)
                let newContacts = this.state.contacts
                newContacts[i] = contact

                this.setState({
                    ...this.state,
                    contacts: newContacts
                })
            })
    }

    createContact = (contact: Contact) => {
        this.contactService.create(contact)
            .then(() => {
                let newContacts = this.state.contacts
                newContacts.push(contact)
                this.setState({
                    contacts: newContacts
                })
            })
    }

    deleteTask = (id: number) => {
        this.taskService.delete(`${id}`).then(() => {
                this.setState({
                    ...this.state,
                    tasks: this.state.tasks.filter(t => t.id !== id)
                })
            })
    }

    updateTask = (task: Task) => {
        this.taskService.update(task).then(() => {
                const i = this.state.tasks.findIndex(value => value.id === task.id)
                let newTasks = this.state.tasks
                newTasks[i] = task
                this.setState({
                    ...this.state,
                    tasks: newTasks
                })
            })
    }

    completeTask = (task: Task) => {
        this.updateTask({
            id: task.id,
            title: task.title,
            description: task.description,
            isComplete: true
        })
    }

    createTask = (task: Task) => {
        this.taskService.create(task).then(response => {
                this.setState({
                    tasks: [...this.state.tasks, task]
                })
            })
    }
}