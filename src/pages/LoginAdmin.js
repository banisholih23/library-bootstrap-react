import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import logo from '../assets/booklogo2.png'

import Loading from '../components/Loadings'
// import { connect } from 'react-redux'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      showModal: false,
      isLoading: false
    }
    this.onFormChange = (e, form) => {
      this.setState({ [form]: e.target.value })
    }
    
    this.onLogin = (e) => {
      e.preventDefault()
      this.setState({ isLoading: true })
      const { email, password } = this.state
      if ((email === 'admin@admin') && (password === 'admin')) {
        setTimeout(() => {
          this.setState({ isLoading: false }, () => {
            localStorage.setItem('token', 'true')
            this.props.check()
            this.props.history.push('/dashboard')
          })
        }, 1000)
      } else {
        this.setState({ showModal: true, isLoading: false })
      }
    }
    this.checkLogin = () => {
      if (localStorage.getItem('token')) {
        this.props.history.push('/dashboard')
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
                  <h1>Login Admin</h1>
                  <p>Welcome Back, Please Login to your account</p>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Email</div>
                      <Input type='text' onChange={(e) => this.onFormChange(e, 'email')} placeholder="banisholih@gmail.com" />
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
        {this.state.isLoading && (<Loading/>)}
      </>
    )
  }
}

export default Login