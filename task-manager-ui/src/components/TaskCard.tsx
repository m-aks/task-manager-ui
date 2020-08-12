import React, {Component, useState} from 'react'
import {Card, Button, Modal, ButtonGroup, Form, Row, Col, Container, Spinner} from 'react-bootstrap'
import axios from "axios";
import {TaskMenu} from "./TaskMenu";

export const TaskCard = ({task, contacts, relations, onDelete, onUpdate, onComplete}:any) => {

    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }

    return (
        <>
            <Card
                key={task.id}
                style={{width: "300px", margin: "10px"}}>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        {task.description}
                    </Card.Text>
                    <ButtonGroup>
                        <Button
                            variant="primary"
                            onClick={handleShow}
                        >Edit</Button>
                        <Button
                            variant="success"
                            onClick={() => onComplete(task)}
                        >Complete</Button>
                        <Button
                            variant="danger"
                            onClick={() => onDelete(task.id)}
                        >Delete</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
            <TaskMenu
                task={task}
                contacts={contacts}
                relations={relations}
                onClose={handleClose}
                onSave={onUpdate}
                isOpen={show}
            />
        </>
    )
}