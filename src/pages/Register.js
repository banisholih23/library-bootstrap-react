import React, {Component} from 'react'
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'

import logo from '../assets/bookshelf.png'

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


class Register extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      fullname: '',
      email: '',
      password: ''
    }
  }

  register = (e) => {
    e.preventDefault()
    const data = {
      userData: {
        username: this.state.username,
        fullname: this.state.fullname,
        email: this.state.email,
        password: this.state.password
      }
    }
    this.props.history.push('/list-book', data)
  }

  render(){
    return(
      <>
        <Row className='h-100 no-gutters'>
          <Col md={8} className='register-cover'>
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
              <div className='flex-grow-1 d-flex justify-content-center align-items-center pr-5'>
                <Form>
                  <h1>Register</h1>
                  <p>Welcome Back, Please Login to your account</p>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Username</div>
                      <Input type='username' bsSize='sm' placeholder='banishh_' />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Full Name</div>
                      <Input type='fullname' bsSize='sm' placeholder='Bani Sholih' />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Email</div>
                      <Input type='email' bsSize='sm' placeholder='banisholih@gmail.com' />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Password</div>
                      <Input type='password' bsSize='sm' placeholder='************' />
                    </Label>
                  </FormGroup>
                  <div className='mt-100'>
                    <Link to={'/home'}>
                      <Button color='primary'>Sign Up</Button>
                    </Link>
                    <Link to={'/login'}>
                      <Button outline color='secondary' className='ml-2'>Login</Button>
                    </Link>
                  </div>
                </Form>
              </div>
              <div className='d-flex flex-column justify-content-center align-item-center'>
                <div className='px-5'>By signing up, you agree to Book’s</div>
                <div className='px-5'>Terms and Conditions &amp; Privacy Policy</div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Register