import React, {Component} from 'react'
import {
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'

import axios from 'axios'

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import logo from '../assets/bookshelf.png'
import profile from '../assets/myprofile.png'
import cover from '../assets/covernyadilan.png'

class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  async componentDidMount(){
    const results = await axios.get('http://localhost:5000/books')
    const {data} = results.data
    this.setState({data})
    console.log(data)
  }

  render(){
    return(
      <>
        <Row className="h-100 no-gutters">
          <Col md={2} className="sidebar shadow p-3 mb-5 bg-white rounded">
            <div className="profile">
              <div className="d-flex flex-column justify-content-beetween pt-5">
                <img className="profile-img" src={profile} alt="profile-image" />
                <h4 className="d-flex align-items-center pl-4 pt-2">Bani Sholih</h4>
              </div>
            </div>
            <Navbar className="d-flex flex-column justify-content-beetween mt-4" light expand="md">
              <NavbarBrand href="/home">Explore</NavbarBrand>
              <NavbarBrand href="/home">History</NavbarBrand>
              <NavbarBrand href="/home">AddBook</NavbarBrand>
            </Navbar>
          </Col>
          <Col md={10} className="content">
            <div className="navbar shadow p-3 mb-5 bg-white rounded ml-3">
              <Navbar className="w-100" color="light" light expand="md">
                <NavbarBrand href="/home">All Category</NavbarBrand>
                <NavbarBrand href="/home" className="ml-3">All Time</NavbarBrand>
                <FormGroup>
                  <Label className="w-100 mt-4 ml-5">
                    <Input className="ml-5 w-100" type="search" placeholder="search book"></Input>
                  </Label>
                </FormGroup>
                <div className="d-flex w-100 justify-content-end pl-5">
                  <img className="pl-5" src={logo} alt="logo" />
                  <h4 className="mt-3 ml-2">Library</h4>
                </div>
              </Navbar>
            </div>
            <div className="container">
              <Row className='w-100 list-book'>
                <Col className='list-book-content'>
                  <h4 className="pl-3">List All Books</h4>
                  <Row>
                  {this.state.data.map((lis_book, index) => (
                    <Col md={3}>
                      <div className="card-deck p-2 mt-4 col-md-35">
                        <div className="card shadow p-1 mb-5 bg-white rounded">
                          <img className="card-img-top" src={lis_book.image} alt="Card image cap" />
                          <div className="card-body">
                            <h5 className="card-title">
                              <Link to={'/details'}>
                                <a classNameName='text-black'>{lis_book.book_title}</a>
                              </Link>
                            </h5>
                            <p className="card-text">{lis_book.book_desc}</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Home