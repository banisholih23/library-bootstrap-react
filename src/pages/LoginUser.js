import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import logo from '../assets/booklogo2.png'
import Loading from '../components/Loadings'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { requestLogin } from '../redux/actions/auth'

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class LoginAdmin extends Component {
  constructor(props) {
    super(props)

    if (localStorage.getItem('token')) {
      props.history.push('/home')
    }

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      success: false,
      errors: {
        email: '',
        password: '',
      }
    }
    this.onFormChange = (e, form) => {
      this.setState({ [form]: e.target.value })
    }

    this.onLogin = (e) => {
      e.preventDefault()
      const { email, password } = this.state
      if (email.length < 1 || password.length < 1) {
        alert('all form must be filled')
      } else {
        if (validateForm(this.state.errors)) {
          const data = {
            email,
            password,
          }
          this.props.dispatch(requestLogin(data, this.props))
        } else {
          alert('You failed to login')
        }
      }
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
              <h1 className='text-white p-5 font-cover'>Welcome to Bans-Library <br /> Have a Nice Day</h1>
              <p className='text-white pl-5 font-style'>This app was made by Bani Sholih</p>
            </div>
          </Col>
          <Col md={4}>
            <div className='d-flex flex-column w-100 h-100'>
              <div className='d-flex justify-content-end'>
                <img className='p-3' src={logo} alt='Logo' />
              </div>
              <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <Form onSubmit={e => this.onLogin(e)}>
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

const mapStateToProps = (auth) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(LoginAdmin)