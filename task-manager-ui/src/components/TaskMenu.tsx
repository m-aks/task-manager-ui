import React, {useState} from "react"
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap"
import {Contact, Task, Relation} from "./EntityTabs"
import {RelationService} from "../services/RelationService"

interface TaskMenuProps{
    task:Task
    contacts:Contact[]
    relations:Relation[]
    onClose: () => void
    onSave: (_:Task) => void
    isOpen: boolean
}

export const TaskMenu = ({task, contacts,relations,onClose, onSave, isOpen}:TaskMenuProps) => {

    const [title, setTitle] = useState(task.title)
    const [desc, setDesc] = useState(task.description)
    const [relation, setRelation] = useState(relations)

    function inRelation(contactId: number){
        let result = false
        relation.forEach(r=>{
            if(r.contactId===contactId)
                result=true
        })
        return result
    }

    async function deleteRelation(contactId: number){
        await new RelationService().delete(`${task.id}/${contactId}`)
            .then(responce=>{
                setRelation(relation.filter(r => r.contactId !== contactId && r.taskId !== task.id))
            })
    }

    async function createRelation(contactId: number){
        await new RelationService().create({taskId:task.id,contactId:contactId})
            .then(responce=>{
            let newRelations = relation
            newRelations.push({
                taskId: task.id,
                contactId: contactId
            })
            setRelation(newRelations)
        })
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