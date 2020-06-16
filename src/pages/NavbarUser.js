import React, { Component } from 'react'

import {
    Form,
    Navbar,
    Nav,
    FormControl
} from 'react-bootstrap'

import {Button, Modal, ModalBody, ModalFooter} from 'reactstrap'

import { Link } from 'react-router-dom'
import history from '../utils/history'
import brand from '../assets/booklogo.png'
import Loading from '../components/Loadings'

class TopNavbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            isLoading: false,
            showLogout: false
        }
        this.onLogout = () => {
            this.setState({isLoading: true},()=>{
              setTimeout(()=>{
                this.setState({isLoading: false}, ()=>{
                  localStorage.removeItem('token')
                    // this.props.check()
                    history.push('/user')
                })
              },1000)
            })
        }
        this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
    }

    home = (e) => {
        e.preventDefault()

        this.props.history.push('/home')
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
                    <Navbar.Brand href="#home">Welcome</Navbar.Brand>
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
                        <Button color='danger'>
                            <Link className="text-white" onClick={this.onLogout}>Yes</Link>
                        </Button>
                        <Button color='secondary' onClick={this.toggleLogoutModal}>No</Button>
                    </ModalFooter>
                </Modal>
                {this.state.isLoading && (<Loading/>)}
            </>
        )
    }
}
export default TopNavbar