import React, { Component } from 'react'
import {
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Button,
  FormText,
  FormGroup,
  Label,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Card, CardImg, CardBody
} from 'reactstrap'

import axios from 'axios'

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import qs from 'querystring'

import logo from '../assets/bookshelf.png'
import profile from '../assets/myprofile.png'

class Home extends Component {
  state = {
    visible: true,
    modalIsOpen: false,
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handlerSubmit = async (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    data.set('image', data.get('image').toUpperCase())

    await axios.post('http://localhost:5000/books')
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pageInfo: {},
      isLoading: false
    }
  }

  fetchData = async (params) => {
    this.setState({ isLoading: true })
    const { REACT_APP_URL } = process.env
    const param = `${qs.stringify(params)}`
    const url = `${REACT_APP_URL}books?${param}`
    // const url = 'http://localhost:5000/books'
    const results = await axios.get(url)
    const { data } = results.data
    // const pageInfo = {
    //   page: results.data.page,
    //   perPage: results.data.perPage,
    //   totalData: results.data.totalData,
    //   totalPage: results.data.totalPage,
    // }
    const pageInfo = results.data.pageInfo
    this.setState({ data, pageInfo, isLoading: false })
    if (params) {
      this.props.history.push(`?${param}`)
    }
  }

  async componentDidMount() {
    const results = await axios.get('http://localhost:5000/books')
    const { data } = results.data
    this.setState({ data })
    console.log(data)
    const param = qs.parse(this.props.location.search.slice(1))
    await this.fetchData(param)
  }

  // async componentWillMount(){
  //   const resultPost = await axios.post('http://localhost:5000/books')
  //   const {data} = resultPost.data
  //   this.setState({data})
  //   // console.log(data)
  // }

  render() {
    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    return (
      <>
        <Row className="h-100 no-gutters">
          <Col md={2} className="sidebar shadow p-3 mb-5 bg-white rounded">
            <div className="profile">
              <div className="d-flex flex-column justify-content-beetween pt-2">
                <img className="profile-img" src={profile} alt="profile-image" />
                <h4 className="d-flex align-items-center pl-4 pt-2">Bani Sholih</h4>
              </div>
            </div>
            <Navbar className="pr-5 mr-3 flex-column justify-content-beetween mt-4" light expand="md">
              <NavbarBrand href="/home">Explore</NavbarBrand>
              <NavbarBrand href="/home">History</NavbarBrand>
              <Button className='text-black' onClick={this.toggleModal.bind(this)}>Add Book</Button>
              <Modal isOpen={this.state.modalIsOpen}>
                <ModalHeader toggle={this.toggleModal.bind(this)}>Add Book</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input type="file" name="image" onChange={this.handlerChange} />
                    <FormText color="muted">
                      This is some placeholder block-level help text for the above input.
                      It's a bit lighter and easily wraps to a new line.
                        </FormText>
                  </FormGroup>
                  {/* <FormGroup>
                        <Label className='w-100'>
                          <h6 className="pl-1">URL Image</h6>
                          <Input type='text' name="image" onChange={this.handlerChange} className="mt-2" placeholder="http://gambar.com/kopi.jpg" />
                        </Label>
                      </FormGroup> */}
                  <FormGroup>
                    <Label className='w-100'>
                      <h6 className="pl-1">Title</h6>
                      <Input type='text' name="book_title" onChange={this.handlerChange} className="mt-2" placeholder="Filosfi Kopi" />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100 h-100'>
                      <h6 className="pl-1">Description</h6>
                      <Input type='text' name="book_desc" onChange={this.handlerChange} className="mt-2" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus." />
                    </Label>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button type="text" name="image" color="primary" onSubmit={this.handlerSubmit}>Submit</Button>
                  <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>
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
            <Row>
              <Col md={12}>
                {this.state.isLoading &&
                  <div className='d-flex justify-content-center align-items-center'>
                    Loading...
                  </div>
                }
                {!this.state.isLoading && (
                  <div className="container">
                    <Row className='w-100 list-book'>
                      <Col className='list-book-content'>
                        <h4 className="pl-3">List All Books</h4>
                        <Row xs='3' className='w-100 mb-5 card-deck'>
                          {this.state.data.map((lis_book, index) => (
                            <Link className="text-decoration-none" to={{
                              pathname: `/detailstry/${lis_book.id}`,
                              state: {
                                id: `${lis_book.id}`,
                                book_title: `${lis_book.book_title}`,
                                book_desc: `${lis_book.book_desc}`,
                                book_status: `${lis_book.book_status}`,
                                book_author: `${lis_book.book_author}`,
                                cover: `${lis_book.image}`
                              }
                            }}>
                              <Col>
                                <Card role='button' className="mt-5 b-shadow">
                                  <CardImg className='img-fluid' src={lis_book.image} alt="Card image cap" />
                                  <CardBody>
                                    <div className='text-dark h5'>{lis_book.book_title}</div>
                                    <div className='text-muted'>{lis_book.book_status}</div>
                                    <div className='text-dark'>{lis_book.book_author}</div>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Link>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )}
                <Row className='mt-5 mb-5'>
                  <Col md={12}>
                    <div className='d-flex flex-row justify-content-between'>
                      <div>
                        {<Button className="ml-5" onClick={() => this.fetchData({ ...params, page: parseInt(params.page) - 1 })}>Prev</Button>}
                      </div>
                      <div>
                        {[...Array(this.state.pageInfo.totalPage)].map((o, i) => {
                          return (
                            <Button onClick={() => this.fetchData({ ...params, page: params.page ? i + 1 : i + 1 })} className='mr-1 ml-1' key={i.toString()}>{i + 1}</Button>
                          )
                        })}
                      </div>
                      <div>
                        <Button className="mr-5" onClick={() => this.fetchData({ ...params, page: parseInt(params.page) + 1 })}>Next</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

export default Home