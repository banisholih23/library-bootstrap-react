import React, { Component } from 'react'

import {Form, Navbar, Nav, FormControl, Button} from 'react-bootstrap'

import { Link } from "react-router-dom";

import brand from '../assets/booklogo.png'
import Loading from '../components/Loadings'

class TopNavbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }


  search = (e) => {
    if (e.keyCode === 13) {
      this.props.search(
        { search: this.state.query }
      )
    }
  }

  render() {
    return (
      <>
        <Navbar bg="light" expand="sm" className="w-100 h-100 no-gutters top-navbar shadow">
          <Navbar.Brand>
            <Link className="nav-link text-dark text-decoration-none" to="/">Welcome</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex w-100 justify-content-center">
              <Form inline onSubmit={(e) => e.preventDefault()}>
                <FormControl type="text" placeholder="Search" onKeyDown={(e) => this.search(e)} onChange={(e) => this.setState({ query: e.target.value })} className="mr-sm-2" />
              </Form>
            </Nav>
            <div className="d-flex mr-4 mt-2">
              <Link to={'/user'}>
                <Button className='text-black ml-2 mb-2' variant="success">Login</Button>
              </Link>
              <Link to={'/register'}>
                <Button className='text-black ml-2 mb-2' variant="primary">Register</Button>
              </Link>
            </div>
            <div className="navbar-brand d-flex">
              <img src={brand} alt="brand" />
            </div>
          </Navbar.Collapse>
        </Navbar>
        {this.state.isLoading && (<Loading />)}
      </>
    )
  }
}
export default TopNavbar