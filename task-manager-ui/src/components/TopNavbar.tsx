import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'

export const TopNavbar = () => {
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>TaskManager</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="about">About</Nav.Link>
            </Nav>
        </Navbar>
    )
}