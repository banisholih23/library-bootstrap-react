import React, { Component } from 'react'

import {
    Form,
    Navbar,
    Nav,
    NavDropdown,
    FormControl
   } from 'react-bootstrap'

   import brand from '../assets/booklogo.png'

class TopNavbar extends Component {

    constructor(props){
        super(props)
        this.state = {
            query: ''
        }
    }
    

    search = (e) => {
        if(e.keyCode === 13) {
            this.props.search(
                { search: this.state.query } 
            )
        }
    }

    render(){
        return(
            <>
         <Navbar bg="light" expand="sm" className="w-100 h-100 no-gutters top-navbar shadow">
                <Navbar.Brand href="#home">Welcome</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex w-100 justify-content-center">
                    <NavDropdown title="All Category" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="All Time" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <Form inline onSubmit={(e) => e.preventDefault()}>
                    <FormControl type="text" placeholder="Search" onKeyDown={(e) => this.search(e)} onChange={(e) => this.setState({ query: e.target.value })} className="mr-sm-2" />
                    </Form>
                    </Nav>
                    <div className="navbar-brand d-flex">
                      <img src={brand} alt="brand"/>
                    </div>
                </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}
export default TopNavbar