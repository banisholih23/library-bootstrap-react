import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'

import logo from '../assets/bookshelf.png'

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import swal from 'sweetalert2'
import axios from 'axios'
const { REACT_APP_URL } = process.env


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.handleRegist = this.handleRegist.bind(this)
    this.toggleRegistSuccess = this.toggleRegistSuccess.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleRegistSuccess() {
    this.setState({
      showRegistSuccess: !this.state.showRegistSuccess
    })
  }

  handleRegist = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    console.log(this.state)
    const url = `${REACT_APP_URL}books/auth/register`
    console.log(url)
    await axios.post(url, userData).then((response) => {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error.response);
        swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: "Something's wrong dude"
        })
      })
    this.props.history.push('/')
    // this.fetchData()
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Good! Thank You For Register"
    })
  }

  render() {
    return (
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
                      <Input name='email' bsSize='sm' placeholder='banisholih@gmail.com' onChange={this.handleChange} />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Password</div>
                      <Input name='password' bsSize='sm' placeholder='************' onChange={this.handleChange} />
                    </Label>
                  </FormGroup>
                  <div className='mt-100'>
                    <Button onSubmit={this.handleRegist} color='primary'>Sign Up</Button>
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