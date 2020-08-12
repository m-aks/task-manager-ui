import React, {useState} from 'react'
import {Modal, Button, Card, ButtonGroup, Form} from 'react-bootstrap'
import axios from "axios";

export const ContactCard = ({contact, onDelete, onUpdate}:any) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    return(
        <>
            <Card style={{ width: "300px", margin: "10px"}}>
                <Card.Body>
                    <Card.Title>{contact.name}</Card.Title>
                    <Card.Text>
                        {contact.number}
                    </Card.Text>
                    <ButtonGroup >
                        <Button
                            variant="primary"
                            onClick={handleShow}
                        >Edit</Button>
                        <Button
                            variant="danger"
                            onClick={()=>onDelete(contact.id)}
                        >Delete</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Contact menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="Ex. Maria"
                            defaultValue={contact.name}
                            onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            placeholder="+7-(xxx)-xxx-xx-xx"
                            defaultValue={contact.number}
                            onChange={e => setNumber(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button
                        variant="primary"
                        onClick={
                            ()=>{
                                onUpdate({
                                    id: contact.id,
                                    name: name.trim()? name : contact.name,
                                    number: number.trim()? number : contact.number
                                })
                            }
                        }
                    >Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}