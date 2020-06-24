import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'

import logo from '../assets/booklogo2.png'
import { Link } from "react-router-dom";
import Loading from '../components/Loadings'
import { connect } from 'react-redux'
import { requestRegister } from '../redux/actions/auth'

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      isLoading: false,
      errors: {
        username: '',
        email: '',
        password: ''
      }
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

  handleRegist = async (e) => {
    e.preventDefault()
    const { username, email, password } = this.state
    if (username.length < 1 || email.length < 1 || password.length < 1) {
      alert('all form must be filled')
    } else {
      if (validateForm(this.state.errors)) {
        const data = {
          username,
          email,
          password,
        }
        this.props.dispatch(requestRegister(data, this.props))
      } else {
        alert('You failed to login')
      }
    }
  }

  render() {
    return (
      <>
        <Row className='h-100 no-gutters'>
          <Col md={8} className='register-cover'>
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
                    <Button onSubmit={this.handleRegist} color='primary'>Sign Up</Button>
                    <Link to={'/user'}>
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
        {this.state.isLoading && (<Loading />)}
      </>
    )
  }
}

const mapStateToProps = (auth) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Register)