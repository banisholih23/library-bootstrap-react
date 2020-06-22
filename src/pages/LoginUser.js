import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import logo from '../assets/booklogo2.png'
import Loading from '../components/Loadings'

import { Link } from "react-router-dom";

import Swal from 'sweetalert2'
import axios from 'axios'
const { REACT_APP_URL } = process.env

class LoginAdmin extends Component {
  constructor(props) {
    super(props)

    if (localStorage.getItem('token')) {
      props.history.push('/home')
    }

    this.state = {
      email: '',
      password: '',
      cpassword: '',
      isLoading: false,
      success: false
    }
    this.onFormChange = (e, form) => {
      this.setState({ [form]: e.target.value })
  }

  this.onLogin = (e) => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const userData = {
      // username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    console.log(this.state)
    const url = `${REACT_APP_URL}books/auth/login`
    console.log(url)
    const {email , password} = this.state
    axios.post(url, userData).then((response) => {
      console.log(response);
      if (email.length < 1 || password.length < 1) {
        alert('all form must be filled')
      } else {
        localStorage.setItem('token', 'true')
      this.props.check()
      this.props.history.push('/home')  
      }
    // this.fetchData()
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "Good! You're Logged In"
      })
    })
      .catch(function (error) {
        console.log(error.response);
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: "Something's wrong dude"
        })
      })
    
    }
    this.checkLogin = () => {
      if (localStorage.getItem('token')) {
        this.props.history.push('/home')
      }
    }
  }

  componentDidMount() {
    this.checkLogin()
  }

  render() {
    return (
      <>
        <Row className='h-100 no-gutters'>
          <Col md={8} className='login-cover'>
            <div className='d-flex flex-column justify-content-between login-overlay w-100 h-100'>
              <h1 className='text-white p-5 font-cover'>Welcome to Bans-Library <br/> Have a Nice Day</h1>
              <p className='text-white pl-5 font-style'>This app was made by Bani Sholih</p>
            </div>
          </Col>
          <Col md={4}>
            <div className='d-flex flex-column w-100 h-100'>
              <div className='d-flex justify-content-end'>
                <img className='p-3' src={logo} alt='Logo' />
              </div>
              <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <Form onSubmit={e=>this.onLogin(e)}>
                  <h1>Login</h1>
                  <p>Welcome Back, Please Login to your account</p>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Email</div>
                      <Input type='text' onChange={(e) => this.onFormChange(e, 'email')} placeholder="name@gmail.com" />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Password</div>
                      <Input type='password' onChange={(e) => this.onFormChange(e, 'password')} placeholder="************" />
                    </Label>
                  </FormGroup>
                  <div className='d-flex flex-row justify-content-between'>
                    <FormGroup check>
                      <Label check>
                        <Input type='checkbox' />
                        <span>Remember Me</span>
                      </Label>
                    </FormGroup>
                    <div>Forgot Password</div>
                  </div>
                  <div className='mt-2'>
                    <Button type="submit" color="primary">Login</Button>
                    <Link to={'/register'}>
                      <Button outline color="secondary" className='ml-2'>Sign Up</Button>
                    </Link>
                  </div>
                </Form>
              </div>
              <div className='d-flex flex-column p-5'>
                <div>By signing up, you agree to Book’s</div>
                <div>Terms and Conditions &amp; Privacy Policy</div>
              </div>
            </div>
          </Col>
        </Row>
        <Modal isOpen={this.state.showModal}>
          <ModalHeader>Warning</ModalHeader>
          <ModalBody>
            Wrong Username or Password
        </ModalBody>
          <ModalFooter>
            <Button autoFocus onClick={() => this.setState({ showModal: false })} color='primary'>OK</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.showNotMatch}>
          <ModalHeader>Warning</ModalHeader>
          <ModalBody>
            Acount Not Match!
        </ModalBody>
          <ModalFooter>
            <Button autoFocus onClick={() => this.setState({ showNotMatch: false })} color='primary'>OK</Button>
          </ModalFooter>
        </Modal>
        {this.state.isLoading && (<Loading/>)}
      </>
    )
  }
}

export default LoginAdmin