import React, { Component } from 'react'
import axios from 'axios'
import qs from 'querystring'
import {Col, Row, Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Input, Navbar, Badge} from 'reactstrap'
import Loading from '../components/Loadings'

import SweetAlert from 'react-bootstrap-sweetalert'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: null,
      showSuccess: false,
      id: props.match.params.id,
      book_title: props.location.state.book_title,
      book_desc: props.location.state.book_desc,
      book_genre: props.location.state.book_genre,
      book_status: props.location.state.book_status,
      book_author: props.location.state.book_author,
      cover: props.location.state.cover,
      genreName: '',
      genreList: [],
      data: []
    }
  }

  home = (e) => {
    e.preventDefault()

    this.props.history.push('/')
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  toggleBorrowModal() {
    this.setState({
      showBorrowModal: !this.state.showBorrowModal
    })
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  loginAlert = () => {
    this.props.history.push('/register')
  }

  onBorrow = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes!"
        confirmBtnBsStyle="success"
        title="You must be have account to borrow this book. Do you want to Regist ?"
        onConfirm={this.loginAlert}
        onCancel={() => this.hideAlert()}
        focusCancelBtn
      >
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
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

  fetchDataGenre = async () => {
		this.setState({isLoading: true})
		const {REACT_APP_URL} = process.env
		const url = `${REACT_APP_URL}books/genres`
    const results = await axios.get(url)
    console.log(results)
    const {data} = results.data
    return data
  }

  genreList = async () => {
    this.setState({ isLoading: true })
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books/genres`
    const results = await axios.get(url)
    this.setState({ genreList: results.data.data })
    console.log(results)
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
              <Navbar className='d-flex justify-content-between w-100 p-3'>
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
            <Button type='button' className='btn btn-lg btn-borrow mr-5 text-white' color="warning" onClick={this.onBorrow}>Borrow</Button>
          </Col>
          {this.state.alert}
        </Row>

        {/* Borrow Modal */}
        <Modal isOpen={this.state.showBorrowModal}>
            <ModalHeader className='h1'>Borrow Book</ModalHeader>
            <ModalBody>
              <h6>User ID</h6>
              <Input name='user_id' onChange={this.handlerChange} type='text' className='mb-2' />
              <h6>Status</h6>
              <Input name='status_id' onChange={this.handlerChange} type='text' className='mb-2' />
              {/* <h6>Admin ID</h6>
              <Input name='employee_id' onChange={this.handlerChange} type='text' className='mb-2'/> */}
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.borrowBook}>Borrow</Button>
              <Button color='secondary' onClick={this.toggleBorrowModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* Delete Succes Modal */}
          <Modal isOpen={this.state.showSuccessModal}>
            <ModalHeader className='h1'>Delete success</ModalHeader>
            <ModalBody className='d-flex justify-content-center align-items-center'>
                {/* <img className='centang' src={centang} alt='SuccessImage'/> */}
            </ModalBody>
            <ModalFooter>
                <Button className='btn-success' onClick={this.home} >Home</Button>
            </ModalFooter>
          </Modal>
          {this.state.isLoading && (<Loading/>)}
      </>
    )
  }
}

export default Details