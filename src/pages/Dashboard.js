import React, { Component } from 'react'
import {Row, Col, Button, Form, Input, Modal, ModalHeader, 
  ModalBody, ModalFooter, Card, CardImg, CardBody, CardDeck
} from 'reactstrap'

import TopNavbar from './Navbar'
import { Carousel, Jumbotron, Dropdown, ButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert2'

import {Link} from "react-router-dom";

import qs from 'querystring'
import Loading from '../components/Loadings'

import {connect} from 'react-redux'

import {getBook, postBook} from '../redux/actions/book'


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
    console.log(props)
    this.checkToken = () => {
      if (!localStorage.getItem('token')) {
        alert('You must login first')
        props.history.push('/admin')
      }
      // else {
      //   props.history.push('/home')
      // }
    }
    this.state = {
      data: [],
      pageInfo: {},
      isLoading: false,
      book_title: '',
      book_desc: '',
      image: '',
      book_genre: 0,
      book_author: '',
      authorList: [],
      book_status: '',
      statusList: [],
      created_at: '',
      genreList: [],
      file: [],
      file_: {}
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.addBook = this.addBook.bind(this)
  }

  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal
    })
  }

  handleImage = (e) => {
    this.setState({ file: URL.createObjectURL(e.target.files[0]), file_: e.target.files[0] })
  }

  async addBook(event) {
    event.preventDefault()

    if (this.state.file_.size > 0) {
      if (this.state.file_.size >= 1240000 || this.state.file_.type.split('/')[0] !== 'image') {
        swal.fire('Failed', 'Max file size is 1.2 MB and file type just image (.img)', 'error')
        return;
      }
    }

    const dataSubmit = new FormData()
    if (this.state.file_.size > 0) {
      dataSubmit.append('image', this.state.file_)
    }
    // dataSubmit.append('image', this.state.image)
    dataSubmit.set('book_title', this.state.book_title)
    dataSubmit.set('book_desc', this.state.book_desc)
    dataSubmit.set('book_genre', this.state.book_genre)
    dataSubmit.set('book_author', this.state.book_author)
    dataSubmit.set('book_status', this.state.book_status)
    dataSubmit.set('created_at', this.state.created_at)

    this.props.postBook(dataSubmit).then((response) => {
      console.log(response);
      this.setState({ showAddModal: false })
      this.fetchData()
      swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Book has been Updated'
      })
    })
      .catch(function (error) {
        swal.fire({
          icon: 'error',
          title: 'haha!',
          text: "Something's wrong"
        })
        console.log(error);
      })
    this.props.history.push(`/dashboard`)
  }

  fetchData = async (params) => {
    this.setState({ isLoading: true })
    const param = `${qs.stringify(params)}`
    this.props.getBook(param).then((response) => {
			const pageInfo = this.props.book.pageInfo
			this.setState({pageInfo, isLoading: false})
			if(param){
					this.props.history.push(`?${param}`)
			}
		})
  }

  genreList = async () => {
    this.setState({ isLoading: true })
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books/genres`
    console.log(url)
    const results = await axios.get(url)
    this.setState({ genreList: results.data.data })
    console.log(results)
  }

  async componentDidMount() {
    // this.checkToken()
    this.checkToken()
    await this.genreList()
    const param = qs.parse(this.props.location.search.slice(1))
    await this.fetchData(param)
  }

  render() {
    const {dataBook} = this.props.book

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
              {/* <Sidebar className="ml-3" /> */}
              <div className="w-100 h-100 d-flex flex-column">
                <div className="top-navbar sticky-top">
                  <TopNavbar className="w-100" search={(query) => this.fetchData(query)} />
                </div>
                <Col>
                  <Jumbotron className="slider-bg mt-3">
                    <Carousel>
                      {dataBook.map((lis_book, index) => (
                        <Carousel.Item key={lis_book.id.toString()}>
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
                    <h4 className="pl-4 flex-row">List All Books </h4>
                    <Col className='pl-1 d-flex justify-space-beetween'>
                      <div className="pl-4">
                        <Button className='btn btn-add-admin' color="success" onClick={this.toggleAddModal}>Add Book</Button>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-end">
                        <Dropdown as={ButtonGroup}>
                          <Button color="warning text-white">Sort by</Button>
                            <Dropdown.Toggle split variant="warning" id="dropdown-split-basic" />
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 0 })}>A-Z</Dropdown.Item>
                              <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 1 })}>Z-A</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Col>
                    <Row className='w-100 mb-5 card-deck'>
                      {dataBook.map((lis_book, index) => (
                        <Link key={lis_book.id.toString()} className="text-decoration-none" to={{
                          pathname: `/detailstry/${lis_book.id}`,
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
                            <CardDeck>
                              <Card role='button' className="mt-3 b-shadow">
                                <CardImg top width="100%" src={lis_book.image} alt="Card image cap" />
                                <CardBody>
                                  <div className='text-dark h5'>{lis_book.book_title}</div>
                                  <div className='text-dark h5'>{lis_book.genre}</div>
                                  <div className='text-muted'>{lis_book.book_status}</div>
                                  <div className='text-dark'>{lis_book.book_author}</div>
                                </CardBody>
                              </Card>
                            </CardDeck>
                          </Col>
                        </Link>
                      ))}
                    </Row>
                    {dataBook.length === 0 && (
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
        <Modal isOpen={this.state.showAddModal}>
          <ModalHeader className='h1'>Add Book</ModalHeader>
          <Form>
            <ModalBody>
              <h6>Title</h6>
              <Input type='text' name='book_title' className='mb-2 shadow-none' onChange={this.handlerChange} />
              <h6>Description</h6>
              <Input type='text' name='book_desc' className='mb-3 shadow-none' onChange={this.handlerChange} />
              <h6>Author</h6>
              <Input type="text" name='book_author' className='mb-3 shadow-none' onChange={this.handlerChange} value={this.state.book_author} />
              <h6>Genre</h6>
              <Input type='select' name='book_genre' className='mb-3 shadow-none' onChange={this.handlerChange} value={this.state.book_genre}>
                {this.state.genreList.map((book_genre, index) => (
                  <option key={book_genre.id.toString()} className="list-group-item bg-light" value={book_genre.name}>{book_genre.name}</option>
                ))}
              </Input>
              <h6>Status</h6>
              <Input type='select' name='book_status' className='mb-3 shadow-none' onChange={this.handlerChange}>
                <option>Available</option>
                <option>Empty</option>
              </Input>
              <h6>Created-at</h6>
              <Input type='date' name='created_at' className='mb-3 shadow-none' onChange={this.handlerChange} />
              <h6>Cover Image</h6>
              <Input type="file" accept="image/*" name="file" id="file" onChange={this.handleImage} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addBook}>Add Book</Button>
              <Button color="secondary" onClick={this.toggleAddModal}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
        {this.state.isLoading && (<Loading />)}
      </>
    )
  }
}

const mapStateToProps = state => ({
  book: state.book
})

const mapDispatchToProps = { getBook, postBook }

export default connect(mapStateToProps, mapDispatchToProps)(Home)