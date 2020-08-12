import React, {useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import axios from "axios";

export const TaskMenu = ({task, contacts,relations,onClose, onSave, isOpen}:any) => {

    const [title, setTitle] = useState(task.title)
    const [desc, setDesc] = useState(task.description)
    const [relation, setRelation] = useState(relations)

    function inRelation(contactId){
        let result = false
        relations.forEach(r=>{
            if(r.contactId===contactId)
                result=true
        })
        return result
    }

    const url = "http://localhost:9000"
    //const url = process.env.SERVER_URL

    async function deleteRelation(contactId){
        axios.delete(`${url}/relations/${task.id}/${contactId}`)
            .then(responce=>{
                let newRelations = relation
                newRelations.filter(r => r.contactId !== contactId)
                setRelation(newRelations)
            })
            .catch(e=>console.log(e))
    }

    async function createRelation(contactId){
        await axios.post(`${url}/relations`,
            {taskId:task.id,contactId:contactId})
            .then(responce=>{
                let newRelations = relation
                newRelations.push({
                    taskId: task.id,
                    contactId: contactId
                })
                setRelation(newRelations)
            })
            .catch(e=>console.log(e))
    }

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
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
                                    defaultValue={title}
                                    onChange={e =>setTitle(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter description"
                                    onChange={e => setDesc(e.target.value)}
                                >
                                    {desc}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Container style={{maxHeight: "200px", overflowY: "scroll"}}>
                                {contacts.map(c => (
                                    <Form.Group>
                                        <Form.Check
                                            defaultChecked={inRelation(c.id)}
                                            type="checkbox"
                                            label={c.name}
                                            onChange={()=>{
                                                if(inRelation(c.id)){
                                                    deleteRelation(c.id)
                                                }
                                                else{
                                                    createRelation(c.id)
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
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={
                        () => {
                            onSave({
                                id: task.id,
                                title: title,
                                description: desc,
                                isComplete: task.isComplete
                            })
                        }
                    }
                >Save</Button>
            </Modal.Footer>
        </Modal>
    )
}