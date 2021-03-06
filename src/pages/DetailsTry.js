import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import {
  Col, Row, Button, Modal, ModalHeader,
  ModalBody, ModalFooter, Input, Form, Navbar, Badge
} from 'reactstrap'

import {connect} from 'react-redux'

import {deleteBook, patchBook} from '../redux/actions/book'

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
      genres: props.location.state.genres,
      genreName: '',
      genreList: [],
      book_id: '',
      status_id: '',
      created_at: '',
      user_id: '',
      employee_id: 0,
      file: [],
      file_: {},
      data: []
    }
    this.deleteBook = this.deleteBook.bind(this)
    this.updateBook = this.updateBook.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
  }

  home = (e) => {
    e.preventDefault()

    this.props.history.push('/dashboard')
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  toggleEditModal() {
    this.setState({
      showEditModal: !this.state.showEditModal
    })
  }
  toggleDeleteModal() {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    })
  }
  toggleBorrowModal() {
    this.setState({
      showBorrowModal: !this.state.showBorrowModal
    })
  }
  async deleteBook() {
    const {id} = this.state
    this.props.deleteBook(id)
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Poof! delete success'
    })
    this.props.history.push('/dashboard')
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleImage = (e) => {
    this.setState({ file: URL.createObjectURL(e.target.files[0]), file_: e.target.files[0] })
  }

  updateBook = (event) => {
    event.preventDefault()

    if (this.state.file_.size > 0) {
      if (this.state.file_.size >= 1240000 || this.state.file_.type.split('/')[0] !== 'image') {
        swal.fire('Failed', 'Max file size is 1240KB and file type just image', 'error')
        return;
      }
    }

    this.setState({ isLoading: true })
    const bookData = new FormData()
    if (this.state.file_.size > 0) {
      bookData.append('image', this.state.file_)
    }
    // bookData.append('image', this.state.image)
    bookData.set('book_title', this.state.book_title)
    bookData.set('book_desc', this.state.book_desc)
    bookData.set('book_genre', this.state.book_genre)
    bookData.set('book_author', this.state.book_author)
    bookData.set('book_status', this.state.book_status)
    bookData.set('created_at', this.state.created_at)

    const {id} = this.state 
    this.props.patchBook(id, bookData).then((response) => {
      console.log(response)
    })
      .catch(function (error) {
        console.log(error.response);
        swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: "Something's wrong, I can feel it"
        })
      })
    this.props.history.push('/dashboard')
    this.fetchData()
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Good! Update successfully"
    })
  }

  fetchData = async () => {
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
    await this.genreList()
    const data = await this.fetchData()
    this.setState({ genreName: data.name })
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
                <div className='text-white d-flex'>
                  <Button className='text-black' color="primary" onClick={this.toggleEditModal}>Edit</Button>
                  <Button className='text-black ml-2' color="danger" onClick={this.toggleDeleteModal}>Delete</Button>
                </div>
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
        </Row>

        {/* Edit Modal */}
        <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className='h1'>Edit Book</ModalHeader>
          <Form>
            <ModalBody>
              <h6>Title</h6>
              <Input type='text' name='book_title' className='mb-2 shadow-none' value={this.state.book_title} onChange={this.handlerChange} />
              <h6>Description</h6>
              <Input type='text' name='book_desc' className='mb-3 shadow-none' value={this.state.book_desc} onChange={this.handlerChange} />
              <h6>Author</h6>
              <Input type='text' name='book_author' className='mb-3 shadow-none' value={this.state.book_author} onChange={this.handlerChange} />
              <h6>Genre</h6>
                  <Input type='select' name='book_genre' className='mb-3 shadow-none' onChange={this.handlerChange} value={this.state.book_genre}>
                    {this.state.genreList.map((book_genre, index) =>(
                      <option key={book_genre.id.toString()} className="list-group-item bg-light" value={book_genre.name}>{book_genre.name}</option>
                    ))}
                  </Input>
              <h6>Status</h6>
              <Input type='select' name='book_status' className='mb-3 shadow-none' value={this.state.book_status} onChange={this.handlerChange}>
                <option>Available</option>
                <option>Empty</option>
              </Input>
              <h6>Created-at</h6>
              <Input type='date' name='created_at' className='mb-3 shadow-none' onChange={this.handlerChange} />
              <h6>Image</h6>
              <Input type="file" accept="image/*" name="file" id="file" onChange={this.handleImage} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateBook}>Edit Book</Button>
              <Button color="secondary" onClick={this.toggleEditModal}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={this.state.showDeleteModal}>
          <ModalBody className='h4'>Are you sure?</ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.deleteBook}>Delete</Button>
            <Button color='secondary' onClick={this.toggleDeleteModal}>Cancel</Button>
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
      </>
    )
  }
}

const mapDispatchToProps = {deleteBook, patchBook}

export default connect(null, mapDispatchToProps)(Details)