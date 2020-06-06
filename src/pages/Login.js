import React, {Component} from 'react'
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'

import logo from '../assets/bookshelf.png'

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  login = (e) => {
    e.preventDefault()
    const data = {
      userData: {
        email: this.state.email,
        password: this.state.password,
      }
    }
    this.props.history.push('/list-book', data)
  }

  render(){
    return(
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
                <Form>
                  <h1>Login</h1>
                  <p>Welcome Back, Please Login to your account</p>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Email</div>
                      <Input type='email' placeholder="banisholih@gmail.com" />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Password</div>
                      <Input type='password' placeholder="************" />
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
                    <Link to={'/home'}>
                      <Button color="primary">Login</Button>
                    </Link>
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
      </>
    )
  }
}

export default Login