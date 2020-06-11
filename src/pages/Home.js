import React, { Component } from 'react'
import {
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Button,
  FormText,
  FormGroup,
  Form,
  Label,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Card, CardImg, CardBody, CardDeck
} from 'reactstrap'

import TopNavbar from './Navbar'
import Sidebar from './Sidebar'

import { Carousel, Jumbotron, Dropdown } from 'react-bootstrap'

import axios from 'axios'

import swal from 'sweetalert2'

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import qs from 'querystring'

import logo from '../assets/booklogo.png'
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
      isLoading: false,
      book_title: '',
      book_desc: '',
      image: '',
      book_genre: '',
      book_author: '',
      book_status: '',
      created_at: ''
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
		this.addBook = this.addBook.bind(this)
  }

  toggleAddModal(){
		this.setState({
			showAddModal: !this.state.showAddModal
		})
  }
  
  async addBook (event) {
		event.preventDefault()
		const {REACT_APP_URL} = process.env
		const dataSubmit = new FormData()
		dataSubmit.append('image', this.state.image)
		dataSubmit.set('book_title', this.state.book_title)
		dataSubmit.set('book_desc', this.state.book_desc)
		dataSubmit.set('book_genre', this.state.book_genre)
    dataSubmit.set('book_author', this.state.book_author)
    dataSubmit.set('book_status', this.state.book_status)
    dataSubmit.set('created_at', this.state.created_at)

		const url = `${REACT_APP_URL}books`
		await axios.post(url, dataSubmit).then( (response) => {
				console.log(response);
				this.setState({showAddModal: false})
				this.fetchData()
				swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Nais! Book added'
				})
			})
			.catch(function (error) {
				swal.fire({
					icon: 'error',
					title: 'haha!',
					text: "Something's wrong, I can feel it"
				})
				console.log(error);
			 })
		this.props.history.push(`/home`)
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
    params.sort = 0
    return (
      <>
        <Row className="w-100 h-100">
          {this.state.isLoading &&
            <div className='d-flex justify-content-center align-items-center'>
              Loading...
                  </div>
          }
          {!this.state.isLoading && (
            <div className="d-flex flex-row w-100 ml-3">
              <Sidebar className="ml-3" />
              <div className="w-100 h-100 d-flex flex-column">
                <div className="top-navbar sticky-top">
                  <TopNavbar className="w-100" search={(query) => this.fetchData(query)} />
                </div>
                <Col>
                  <Jumbotron className="slider-bg mt-3">
                    <Carousel>
                      {this.state.data.map((lis_book, index) => (
                        <Carousel.Item>
                          <img style={{ height: '200px' }}
                            className="d-block"
                            src={lis_book.image}
                            alt="cover"
                          />
                          <Carousel.Caption>
                            <h3 className="text-light">{lis_book.book_title}</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
                    <Col className='pl-1 mt-2'>
									    <Button className='btn btn-add-admin' onClick={this.toggleAddModal}>Add Book</Button>
									  </Col>
                        <div className='d-flex justify-content-end'>
                        {<Button className='btn-sm btn-sort' onClick={() => this.fetchData({ ...params, sort: 0 })}>Asc</Button>}&nbsp;|&nbsp;
                          {<Button className='btn-sm btn-sort' onClick={() => this.fetchData({ ...params, sort: 1 })}>Desc</Button>}
                      </div>
                    </h4>
                    <Row xs='4' className='w-100 mb-5 card-deck'>
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
                          <Col className="ml-3">
                            <CardDeck>
                              <Card role='button' className="mt-3 b-shadow">
                                <CardImg className='img-fluid' src={lis_book.image} alt="Card image cap" />
                                <CardBody>
                                  <div className='text-dark h5'>{lis_book.book_title}</div>
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
              </div>
            </div>
          )}
        </Row>
        <Modal isOpen={this.state.showAddModal}>
					<ModalHeader className='h1'>Add Book</ModalHeader>
						<Form>
							<ModalBody>
									<h6>Title</h6>
									<Input type='text' name='book_title' className='mb-2 shadow-none' onChange={this.handlerChange}/>
									<h6>Description</h6>
									<Input type='text' name='book_desc' className='mb-3 shadow-none' onChange={this.handlerChange}/>
									<h6>Author</h6>
									<Input type='text' name='book_author' className='mb-3 shadow-none' onChange={this.handlerChange}/>
									<h6>Genre</h6>
									<Input type='text' name='book_genre' className='mb-3 shadow-none' onChange={this.handlerChange}/>
                  <h6>Status</h6>
									<Input type='text' name='book_status' className='mb-3 shadow-none' onChange={this.handlerChange}/>
                  <h6>Created-at</h6>
									<Input type='date' name='created_at' className='mb-3 shadow-none' onChange={this.handlerChange}/>
									<h6>Cover Image</h6>
									<Input type='file' name='image' className='mb-2' onChange={(e) => this.setState({image: e.target.files[0]})}/>
							</ModalBody>
							<ModalFooter>
									<Button color="primary" onClick={this.addBook}>Add Book</Button>
									<Button color="secondary" onClick={this.toggleAddModal}>Cancel</Button>
							</ModalFooter>
						</Form>
				</Modal>
      </>
    )
  }
}

export default Home