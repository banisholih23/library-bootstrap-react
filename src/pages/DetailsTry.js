import React, { Component } from 'react'
import cover from '../assets/covernyadilan.png'
import {
  Row, Col, Input, Navbar, Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import centang from '../assets/centang.png'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      showEdit: false,
      showDelete: false,
      showSuccess: false,
      book_title: props.location.state.book_title,
      book_desc: props.location.state.book_desc,
      book_status: props.location.state.book_status,
      book_author: props.location.state.book_author,
      cover: props.location.state.cover,
      data: []
    }
  }
  home = (e) => {
    e.preventDefault()

    this.props.history.push('/home')
  }
  render() {
    return (
      <>
        <Row className="h-50 w100 no-gutters">
          <Col md={12} className='h-100 bg-cover' style={{backgroundImage: `url(${this.state.cover})`}}>
            <div className='h-100 darker'>
              <Navbar class='d-flex justify-content-between w-100 p-3'>
                <Button className='text-black' onClick={() => this.props.history.goBack()}>Back</Button>
                <div className='text-white d-flex'>
                  <Button className='text-black' color="primary" onClick={() => this.setState({ showEdit: !this.state.showEdit })}>Edit</Button>
                  <Button className='text-black ml-2' color="danger" onClick={() => this.setState({ showDelete: !this.state.showDelete })}>Delete</Button>
                </div>
              </Navbar>
              <img className='rounded b-shadow mt-5 mr-5 float-right cover-fix' src={this.state.cover} alt="cover" />
            </div>
          </Col>
        </Row>
        <Row className="w100 no-gutters mb-5 ml-5 mt-3">
          <Col xs='9'>
            <div className="badge badge-pill badge-warning text-white">Novel</div>
            <div className="h1"> {this.state.book_title} </div>
            <div className="text-success h5"> {this.state.book_status} </div>
            <div className="h6"> {this.state.book_author} </div>
            <div className=''> {this.state.book_desc} </div>
          </Col>
          {/* <Col className='d-flex flex-row justify-content-center ' sx='3'>
                        <Button className="btn btn-warning btn-lg text-white align-self-end b-shadow">Borrow</Button>
                    </Col> */}
        </Row>

        {/* Edit Books */}
        <Modal isOpen={this.state.showEdit}>
          <ModalHeader className='h1'>Edit Books</ModalHeader>
          <ModalBody>
            <h6>Title</h6>
            <Input type='text' className='mb-2' />
            <h6>Description</h6>
            <Input type='text' className='mb-2' />
            <h6>Genre</h6>
            <Input type='text' className='mb-2' />
            <h6>Author</h6>
            <Input type='text' className='mb-2' />
            <h6>Cover Image</h6>
            <Input type='file' className='mb-2' />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick=''>Edit Book</Button>
            <Button color="secondary" onClick={() => this.setState({ showEdit: !this.state.showEdit })}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/*Delete Modal*/}
        <Modal isOpen={this.state.showDelete}>
          <ModalHeader className='h1'>Delete book</ModalHeader>
          <ModalBody>
            <h5 className='ml-2'>Are you sure to delete this book?</h5>
          </ModalBody>
          <ModalFooter>
            <Button className='btn-danger' onClick={() => this.setState({ showSuccess: !this.state.showSuccess })}>Delete</Button>
            <Button className='' onClick={() => this.setState({ showDelete: !this.state.showDelete })}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* Delete Succes Modal */}
        <Modal isOpen={this.state.showSuccess}>
          <ModalHeader className='h1'>Delete success</ModalHeader>
          <ModalBody className='d-flex justify-content-center align-items-center'>
            <div className="align-item-center">
              <img className='centang pl-4' src={centang} alt='SuccessImage' />
            <h5 className="mt-2"> Data Buku Berhasil Dihapus</h5>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className='btn-success' onClick={this.home} >Home</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default Register