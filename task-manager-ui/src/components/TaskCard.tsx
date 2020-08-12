import React, {Component} from 'react'
import {Card, Button, Modal, ButtonGroup, Form, Row, Col, Container, Spinner} from 'react-bootstrap'
import axios from "axios";

//export const TaskCard = ({task,contacts,relations, onDelete, onUpdate, onComplete, onRelation}:any) => {
export class TaskCard extends Component{

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            title: '',
            description: '',
            relation: this.props.relations
        }
    }
    url = "http://localhost:9000"
    handleClose = () => this.setState({show: false})
    handleShow = () => this.setState({show: true})

    inRelation(contactId){
        let result = false
        this.state.relation.map(r=>{
            if(r.contactId===contactId)
                result=true
        })
        return result
    }

    /*async componentDidMount() {
        this.setState({isLoading: true})
        await axios.get(`${this.url}/relations/${this.props.task.id}`)
            .then(response =>
                this.setState({
                    relations: response.data.relations
                }))
            .catch(e => console.log(e))
        this.setState({isLoading: false})
        console.log(`!!!`,this.state.relations)
    }*/

    async deleteRelation(contactId){
    await axios.delete(`${this.url}/relations/${this.props.task.id}/${contactId}`)
        .then(responce=>{
            this.setState({
                ...this.state,
                relation: this.state.relation.filter(r => r.contactId !== contactId)
            })

            console.log(responce)
        })
        .catch(e=>console.log(e))
    }

    async createRelation(contactId){
        await axios.post(`${this.url}/relations`,
            {taskId:this.props.task.id,contactId:contactId})
            .then(responce=>{
                this.state.relation.push({
                    taskId: this.props.task.id,
                    contactId: contactId
                })
                console.log(responce)
            })
            .catch(e=>console.log(e))
    }

    render() {
        return (
            <>
                <Card
                    key={this.props.task.id}
                    style={{width: "300px", margin: "10px"}}>
                    <Card.Body>
                        <Card.Title>{this.props.task.title}</Card.Title>
                        <Card.Text>
                            {this.props.task.description}
                        </Card.Text>
                        <ButtonGroup>
                            <Button
                                variant="primary"
                                onClick={this.handleShow}
                            >Edit</Button>
                            <Button
                                variant="success"
                                onClick={() => this.props.onComplete(this.props.task)}
                            >Complete</Button>
                            <Button
                                variant="danger"
                                onClick={() => this.props.onDelete(this.props.task.id)}
                            >Delete</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Task menu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            placeholder="Ex. Call a friend"
                                            defaultValue={this.props.task.title}
                                            onChange={e => this.setState({title:e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Enter description"
                                            onChange={e => this.setState({description:e.target.value})}>
                                            {this.props.task.description}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Container style={{maxHeight: "200px", overflowY: "scroll"}}>
                                        {this.props.contacts.map(c => (
                                            <Form.Group>
                                                <Form.Check
                                                    defaultChecked={this.inRelation(c.id)}
                                                    type="checkbox"
                                                    label={c.name}
                                                    onChange={()=>{
                                                        if(this.inRelation(c.id)){
                                                            this.deleteRelation(c.id)
                                                        }
                                                        else{
                                                            this.createRelation(c.id)
                                                        }
                                                    }}
                                                />
                                            </Form.Group>
                                        ))}
                                    </Container>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={
                                () => {
                                    this.props.onUpdate({
                                        id: this.props.task.id,
                                        title: this.state.title.trim() ? this.state.title : this.props.task.title,
                                        description: this.state.title.trim() ? this.state.description : this.props.task.description,
                                        isComplete: this.props.task.isComplete
                                    })
                                }
                            }
                        >Save</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}