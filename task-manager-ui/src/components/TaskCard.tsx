import React, {useState} from 'react'
import {Card, Button, Modal, ButtonGroup} from 'react-bootstrap'
import {TaskMenu} from "./TaskMenu"
import {Contact, Relation, Task} from "./EntityTabs"

interface TaskCardProps {
    task: Task
    contacts: Contact[]
    relations: Relation[]
    onDelete: (_: number) => void
    onUpdate: (_: Task) => void
    onComplete: (_: Task) => void
}

export const TaskCard = ({task, contacts, relations, onDelete, onUpdate, onComplete}:TaskCardProps) => {

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