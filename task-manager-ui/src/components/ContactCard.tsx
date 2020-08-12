import React, {useState} from 'react'
import {Button, Card, ButtonGroup, Form} from 'react-bootstrap'
import {ContactMenu} from './ContactMenu'

export const ContactCard = ({contact, onDelete, onUpdate}:any) => {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
            <ContactMenu
                contact={contact}
                onClose={handleClose}
                onSave={onUpdate}
                isOpen={show}
            />
        </>
    )
}