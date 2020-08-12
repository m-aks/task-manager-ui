import React from 'react'
import {Jumbotron,Button} from 'react-bootstrap'

export const About = () => {
    return(
        <div style={{padding: "50px"}}>
            <Jumbotron>
                <h1>Task Manager</h1>
                <p>
                    Application version: 3.0.8
                </p>
                <p>
                    <Button variant="dark" href="https://github.com/m-aks/task-manager">Open git</Button>
                </p>
            </Jumbotron>
        </div>
    )
}