import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'

import history from '../utils/history'
import { Link } from 'react-router-dom';
import avatar from '../assets/myprofile.png'

class Sidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            showLogout: false
        }
        this.onLogout = () => {
            this.setState({isLoading: true},()=>{
              setTimeout(()=>{
                this.setState({isLoading: false}, ()=>{
                  localStorage.removeItem('token')
                  localStorage.removeItem('session_user')
                //   this.props.check()
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

    render() {
        return (
            <>
                <Navbar bg="light" expand="sm" className="d-none d-md-block sidebar shadow">
                    <div className="avatar-img">
                        <img src={avatar} alt="avatar" />
                        <h4 className="text-center pr-5 mt-2">Bani Sholih</h4>
                    </div>
                    <div className="nav-side mt-5">
                        <Nav.Item>
                            <Link className="nav-link text-decoration-none text-white" to="/home"> Dashboard</Link>
                        </Nav.Item>
                        <Button className='text-black ml-2 mb-2' color="danger" onClick={this.onLogout}>Logout</Button>
                        {/* <Nav.Item>
                            <Link className="nav-link text-decoration-none text-white" to="/login"> Logout</Link>
                        </Nav.Item> */}
                    </div>
                </Navbar>
                <Modal isOpen={this.state.showLogoutModal}>
                    <ModalBody className='h4'>Are you sure want to logout?</ModalBody>
                    <ModalFooter>
                        <Button color='danger'>
                            <Link className="text-white" to={'/login'}>Yes</Link>
                        </Button>
                        <Button color='secondary' onClick={this.toggleLogoutModal}>No</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
export default Sidebar