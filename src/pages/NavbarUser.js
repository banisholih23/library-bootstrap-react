import React, { Component } from 'react'

import {
  Form,
  Navbar,
  Nav,
  FormControl
} from 'react-bootstrap'

import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

import { Link } from 'react-router-dom'
import history from '../utils/history'
import brand from '../assets/booklogo.png'
import Loading from '../components/Loadings'

const handleLogout = () => {
  const token = localStorage.getItem('token');
  if (token) {
    localStorage.removeItem('token');
    history.push('/user')
  } else {
    alert("Something's wrong")
  }
}

class TopNavbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      isLoading: false,
      showLogout: false
    }
    this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
  }

  toggleLogoutModal() {
    this.setState({
      showLogoutModal: !this.state.showLogoutModal
    })
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
            <Link className="nav-link text-dark text-decoration-none" to="/home">Welcome</Link>
          </Navbar.Brand>
          <Nav>
            <Link className="nav-link text-decoration-none text-dark" to="/transactionsUser">History</Link>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex w-100 justify-content-center">
              <Form inline onSubmit={(e) => e.preventDefault()}>
                <FormControl type="text" placeholder="Search" onKeyDown={(e) => this.search(e)} onChange={(e) => this.setState({ query: e.target.value })} className="mr-sm-2" />
              </Form>
            </Nav>
            <Button className='text-black mr-3' color="danger" onClick={this.toggleLogoutModal}>Logout</Button>
            <div className="navbar-brand d-flex">
              <img src={brand} alt="brand" />
            </div>
          </Navbar.Collapse>
        </Navbar>
        <Modal isOpen={this.state.showLogoutModal}>
          <ModalBody className='h4'>Are you sure want to logout?</ModalBody>
          <ModalFooter>
            {/* <Button color="danger" className="text-white" onClick={this.onLogout}>Yes</Button> */}
            <Link to="/user">
              <Button color="danger" onClick={(e) => { handleLogout(e) }}>Yes</Button>
            </Link>
            <Button color='secondary' onClick={this.toggleLogoutModal}>No</Button>
          </ModalFooter>
        </Modal>
        {this.state.isLoading && (<Loading />)}
      </>
    )
  }
}

export default TopNavbar