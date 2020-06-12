import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import logo from '../assets/bookshelf.png'

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import Swal from 'sweetalert2'
import axios from 'axios'
const { REACT_APP_URL } = process.env

class LoginAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      showModal: false,
      showNotMatch: false,
      isLoading: false
    }
    this.onFormChange = (e, form) => {
      this.setState({ [form]: e.target.value })
    }

    this.handleLogin = async (e) => {
      e.preventDefault()
      this.setState({ isLoading: true })
      const userData = {
        email: this.state.email,
        password: this.state.password
      }

      // const { password, email } = this.state

      // if (email.length < 1 || password.length < 1) {
      //   Swal.fire(
      //     'Register Failed',
      //     'All field must be filled',
      //     'error'
      //   )
      // }

      console.log(this.state)
      const url = `${REACT_APP_URL}books/auth/login`
      console.log(url)
      // const { email, password } = this.state 
      const result = await axios.post(url, userData)
      // console.log(response);
      if (userData === undefined) {
       this.setState({ showModal: true, isLoading: false })
      } else {
        setTimeout(() => {
          this.setState({ isLoading: false }, () => {
            localStorage.setItem('token', 'true')
            this.props.check()
            this.props.history.push('/')
          })
        }, 1000)
      }
    }
    this.checkLogin = () => {
      if (localStorage.getItem('token')) {
        this.props.history.push('/')
      }
    }
  }

  componentDidMount() {
    this.checkLogin()
  }
  // login = (e) => {
  //   e.preventDefault()
  //   const data = {
  //     userData: {
  //       email: this.state.email,
  //       password: this.state.password,
  //     }
  //   }
  //   this.props.history.push('/list-book', data)
  // }

  render() {
    return (
      <>
        <Row className='h-100 no-gutters'>
          <Col md={8} className='login-cover'>
            <div className='d-flex flex-column justify-content-between login-overlay w-100 h-100'>
              <h1 className='text-white'>Book is a window to the world</h1>
              <div className='text-white'>Photo by Mark Pan4ratte on Unsplash</div>
            </div>
          </Col>
          <Col md={4}>
            <div className='d-flex flex-column w-100 h-100'>
              <div className='d-flex justify-content-end'>
                <img className='p-3' src={logo} alt='Logo' />
              </div>
              <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <Form onSubmit={e => this.handleLogin(e)}>
                  <h1>Login</h1>
                  <p>Welcome Back, Please Login to your account</p>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Email</div>
                      <Input type='email' onChange={(e) => this.onFormChange(e, 'email')} placeholder="banisholih@gmail.com" />
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
      </>
    )
  }
}

export default LoginAdmin