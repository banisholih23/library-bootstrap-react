import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'

import logo from '../assets/booklogo2.png'

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.handleRegist = this.handleRegist.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleRegist = async () => {
    this.props.history.push('/registerlist', this.state);
  }

  render() {
    return (
      <>
        <Row className='h-100 no-gutters'>
          <Col md={8} className='register-cover-task'>
            <div className='d-flex flex-column login-overlay w-100 h-100 p-5'>
              <h1 className='text-white'>Welcome Dude,</h1>
              <h1 className='text-white'>Please Register</h1>
            </div>
          </Col>
          <Col md={4}>
            <div className='d-flex flex-column w-100 h-100'>
              <div className='d-flex justify-content-end'>
                <img className='p-3' src={logo} alt='Logo' />
              </div>
              <div className='flex-grow-1 d-flex justify-content-center align-items-center pr-5'>
                <Form onSubmit={this.handleRegist}>
                  <h1>Register</h1>
                  <p>Welcome Back, Please Login to your account</p>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Username</div>
                      <Input name='username' bsSize='sm' placeholder='banishh_' onChange={this.handleChange} />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Email</div>
                      <Input type="email" name='email' bsSize='sm' placeholder='banisholih@gmail.com' onChange={this.handleChange} />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Password</div>
                      <Input type="password" name='password' bsSize='sm' placeholder='************' onChange={this.handleChange} />
                    </Label>
                  </FormGroup>
                  <div className='mt-100'>
                    <Button onSubmit={this.handleRegist} color='success'>Register</Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Register