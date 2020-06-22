import React, { Component } from 'react'
import { Row, Col, Button, Card, CardImg, CardBody, CardDeck, Badge } from 'reactstrap'

import TopNavbar from './NavbarUser'

import { Carousel, Jumbotron } from 'react-bootstrap'

import axios from 'axios'
import Loading from '../components/Loadings'
import {Link} from "react-router-dom";

import qs from 'querystring'

class Home extends Component {
  state = {
    visible: true,
    modalIsOpen: false,
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  constructor(props) {
    super(props)
    this.checkToken = () => {
      if (!localStorage.getItem('token')) {
        alert('You must login first')
        props.history.push('/user')
      }
      else {
        props.history.push('/home')
      }
    }
    
    this.state = {
      data: [],
      pageInfo: {},
      isLoading: false,
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
  }

  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal
    })
  }

  fetchData = async (params) => {
    this.setState({ isLoading: true })
    const { REACT_APP_URL } = process.env
    const param = `${qs.stringify(params)}`
    const url = `${REACT_APP_URL}books?${param}`
    // const url = 'http://localhost:5000/books'
    const results = await axios.get(url)
    const { data } = results.data
    const pageInfo = results.data.pageInfo
    this.setState({ data, pageInfo, isLoading: false })
    if (params) {
      this.props.history.push(`?${param}`)
    }
  }

  async componentDidMount() {
    this.checkToken()
    const results = await axios.get('http://localhost:5000/books')
    const { data } = results.data
    this.setState({ data })
    console.log(data)
    const param = qs.parse(this.props.location.search.slice(1))
    await this.fetchData(param)
  }

  render() {
    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    params.sort = 0
    return (
      <>
        <Row className="w-100 h-100">
          {this.state.isLoading &&
            <div className='d-flex justify-content-center align-items-center'>

            </div>
          }
          {!this.state.isLoading && (
            <div className="d-flex flex-row w-100 ml-3">
              {/* <SidebarUser className="ml-3" /> */}
              <div className="w-100 h-100 d-flex flex-column">
                <div className="top-navbar sticky-top">
                  <TopNavbar className="w-100" search={(query) => this.fetchData(query)} />
                </div>
                <Col>
                  <Jumbotron className="slider-bg mt-3">
                    <Carousel>
                      {this.state.data.map((lis_book, index) => (
                        <Carousel.Item>
                          <img style={{ height: '300px' }}
                            className="d-block"
                            src={lis_book.image}
                            alt="cover"
                          />
                          <Carousel.Caption>
                            <h3 className="text-light">{lis_book.book_title}</h3>
                            <p>{lis_book.book_desc}</p>
                          </Carousel.Caption>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </Jumbotron>
                </Col>
                <Row className='w-100 list-book'>
                  <Col className='list-book-content'>
                    {/* <h4 className="pl-3">List All Books</h4> */}
                    <h4 className="pl-4 flex-row">List All Books
                      <div className='d-flex justify-content-end'>
                        {<Button className='btn-sm btn-sort' color="info" onClick={() => this.fetchData({ ...params, sort: 0 })}>Asc</Button>}&nbsp;|&nbsp;
                          {<Button className='btn-sm btn-sort text-white' color="warning" onClick={() => this.fetchData({ ...params, sort: 1 })}>Desc</Button>}
                      </div>
                    </h4>
                    <Row className='w-100 mb-5 card-deck'>
                      {this.state.data.map((lis_book, index) => (
                        <Link className="text-decoration-none" to={{
                          pathname: `/detailsuser/${lis_book.id}`,
                          state: {
                            id: `${lis_book.id}`,
                            book_title: `${lis_book.book_title}`,
                            book_desc: `${lis_book.book_desc}`,
                            book_genre: `${lis_book.book_genre}`,
                            book_status: `${lis_book.book_status}`,
                            book_author: `${lis_book.book_author}`,
                            cover: `${lis_book.image}`
                          }
                        }}>
                          <Col xs="12" className="ml-5">
                            <CardDeck width="100%">
                              <Card role='button' className="mt-3 w-100 b-shadow">
                                <CardImg width="100%" className='img-fluid' src={lis_book.image} alt="Card image cap" />
                                <CardBody>
                                  <div className='text-dark h5'>{lis_book.book_title}</div>
                                  <div><Badge color="primary">{lis_book.book_genre}</Badge></div>
                                  <div className='text-muted'>{lis_book.book_status}</div>
                                  <div className='text-dark'>{lis_book.book_author}</div>
                                </CardBody>
                              </Card>
                            </CardDeck>
                          </Col>
                        </Link>
                      ))}
                    </Row>
                    {this.state.data.length === 0 && (
                      <h2 className="text-center">Data Not Available</h2>
                    )}
                  </Col>
                </Row>
                <Row className='mt-5 mb-5'>
                  <Col>
                    <div className='d-flex flex-row justify-content-between'>
                      <div>
                        {<Button className="ml-5" color="info" onClick={() => this.fetchData({ ...params, page: parseInt(params.page) - 1 })}>Prev</Button>}
                      </div>
                      <div>
                        {[...Array(this.state.pageInfo.totalPage)].map((o, i) => {
                          return (
                            <Button onClick={() => this.fetchData({ ...params, page: params.page ? i + 1 : i + 1 })} className='mr-1 ml-1' key={i.toString()}>{i + 1}</Button>
                          )
                        })}
                      </div>
                      <div>
                        <Button className="mr-5" color="success" onClick={() => this.fetchData({ ...params, page: parseInt(params.page) + 1 })}>Next</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Row>
        {this.state.isLoading && (<Loading />)}
      </>
    )
  }
}

export default Home