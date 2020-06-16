import React, { Component } from 'react'
import cover from '../assets/covernyadilan.png'
import axios from 'axios'
import qs from 'querystring'
import swal from 'sweetalert2'
import {Col, Row, Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Input, Form, Navbar, Badge} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import centang from '../assets/centang.png'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEdit: false,
      showDelete: false,
      showSuccess: false,
      id: props.match.params.id,
      book_title: props.location.state.book_title,
      book_desc: props.location.state.book_desc,
      image: props.location.state.image,
      book_genre: props.location.state.book_genre,
      book_status: props.location.state.book_status,
      book_author: props.location.state.book_author,
      cover: props.location.state.cover,
      book_id: '',
      status_id: '',
      created_at: '',
      user_id: '',
      employee_id: 0,
      data: []
    }
    this.borrowBook = this.borrowBook.bind(this)
    this.toggleBorrowModal = this.toggleBorrowModal.bind(this)
  }

  home = (e) => {
    e.preventDefault()

    this.props.history.push('/home')
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  borrowBook = (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    const authorData = {
      book_id: this.state.id,
      user_id: this.state.user_id
      // book_status: this.state.book_status,
      // status_id: this.state.status_id
      // employee_id: this.state.employee_id
    }

    console.log(authorData)
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books/transactions`
    axios.post(url, authorData).then((response) => {
      console.log(response)
    })
      .catch(function (error) {
        console.log(error.response)
        swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: "Something's wrong, I can feel it"
        })
      })
    this.setState({ showBorrowModal: !this.state.showBorrowModal })
    this.props.history.push('/home')
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Yay! borrow book success'
    })
  }

  toggleBorrowModal() {
    this.setState({
      showBorrowModal: !this.state.showBorrowModal
    })
  }
  
  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  fetchData = async (params) => {
    this.setState({ isLoading: true })
    const { REACT_APP_URL } = process.env
    const param = `${qs.stringify(params)}`
    const url = `${REACT_APP_URL}books?${param}`
    const results = await axios.get(url)
    const { data } = results.data
    const pageInfo = results.data.pageInfo
    this.setState({ data, pageInfo, isLoading: false })
    if (params) {
      this.props.history.push(`?${param}`)
    }
  }
  async componentDidMount() {
    const param = qs.parse(this.props.location.search.slice(1))
    await this.fetchData(param)
  }

  render() {
    return (
      <>
        <Row className="h-50 w100 no-gutters">
          <Col md={12} className='h-100 bg-cover' style={{ backgroundImage: `url(${this.state.cover})` }}>
            <div className='h-100 darker'>
              <Navbar class='d-flex justify-content-between w-100 p-3'>
                <Button className='text-white' color="secondary" onClick={this.home}>Back</Button>
                {/* <Button className='text-black' onClick={() => this.props.history.goBack()}>Back</Button> */}
              </Navbar>
              <img className='rounded b-shadow mt-5 mr-5 float-right cover-fix' src={this.state.cover} alt="cover" />
            </div>
          </Col>
        </Row>
        <Row className="w100 no-gutters mb-5 ml-5 mt-3">
          <Col xs='9'>
            <div className="d-flex">
              <div className="ml-2">
                <h5><Badge color="warning text-white">Novel</Badge></h5>
              </div>
              <div className="ml-2">
                <h5><Badge color="primary">{this.state.book_genre}</Badge></h5>
              </div>
            </div>
            <div className="h1"> {this.state.book_title} </div>
            <div className="text-success h5"> {this.state.book_status} </div>
            <div className="h6"> {this.state.book_author} </div>
            <div className=''> {this.state.book_desc} </div>
          </Col>
          <Col className="borrow align-self-end d-flex justify-content-end mt-1">
            <Button type='button' className='btn btn-lg btn-borrow mr-5 text-white' color="warning" onClick={this.toggleBorrowModal}>Borrow</Button>
          </Col>
          {/* <Col className='d-flex flex-row justify-content-center ' sx='3'>
                        <Button className="btn btn-warning btn-lg text-white align-self-end b-shadow">Borrow</Button>
                    </Col> */}
        </Row>

        {/* Borrow Modal */}
        <Modal isOpen={this.state.showBorrowModal}>
            <ModalHeader className='h1'>Borrow Book</ModalHeader>
            <ModalBody>
              <h6>User ID</h6>
              <Input name='user_id' onChange={this.handlerChange} type='text' className='mb-2' />
              {/* <h6>Status</h6>
              <Input name='status_id' onChange={this.handlerChange} type='text' className='mb-2' /> */}
              {/* <h6>Admin ID</h6>
              <Input name='employee_id' onChange={this.handlerChange} type='text' className='mb-2'/> */}
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.borrowBook}>Borrow</Button>
              <Button color='secondary' onClick={this.toggleBorrowModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </>
    )
  }
}

export default Details