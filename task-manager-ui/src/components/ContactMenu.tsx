import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Contact} from "./EntityTabs";

interface ContactMenuProps{
    contact:Contact
    onClose: () => void
    onSave: (_:Contact) => void
    isOpen: boolean
}

export const ContactMenu = ({contact, onClose, onSave, isOpen}:ContactMenuProps) => {

    const [name, setName] = useState(contact.name)
    const [number, setNumber] = useState(contact.number)

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
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
                        defaultValue={name}
                        onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        placeholder="+7-(xxx)-xxx-xx-xx"
                        defaultValue={number}
                        onChange={e => setNumber(e.target.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button
                    variant="primary"
                    onClick={
                        () => {onSave({
                            id: contact.id,
                            name: name,
                            number: number
                        })
                        }
                    }
                >Save</Button>
            </Modal.Footer>
        </Modal>
    )
}