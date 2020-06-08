import React, { Component } from 'react'
import axios from 'axios'
import {
  Row, Col, Nav, Form, Button, Modal, ModalBody,
  ModalHeader, ModalFooter, Input, Table, Container
} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

// import logo from '../assets/smeatech.png'
// import profile from '../assets/myprofile.png'
import centang from '../assets/centang.png'

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      showDelete: false,
      showSuccess: false,
      data: []
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
  }
  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal
    })
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
  async componentDidMount() {
    const results = await axios.get('http://localhost:5000/books/transactions')
    const { data } = results.data
    this.setState({ data })
  }

  home = (e) => {
    e.preventDefault()

    this.props.history.push('/home')
  }

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col md={3}>
              <Button onClick={() => this.setState({ data: [] })}>Reset</Button>
            </Col>
            <Col md={9}>
              {this.state.data.length !== 0 && (
                <Table bordered className='mt-5'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>OrderBy</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((transactions, index) => (
                      <tr>
                        <th scope="row">{transactions.id}</th>
                        <td>{transactions.book_title}</td>
                        <td>{transactions.book_author}</td>
                        <td>{transactions.orderby}</td>
                        <td>{transactions.status}</td>
                        <td>
                          <h6>
                            <Link><a className='text-warning' onClick={this.toggleEditModal}>Edit </a></Link>|
                            <Link><a className='text-black ml-2' onClick={() => this.setState({ showDelete: !this.state.showDelete })}>Delete</a></Link>
                          </h6>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              {this.state.data.length === 0 && (
                <h1>Data is not available!</h1>
              )}
            </Col>
          </Row>

          {/* Add Modal */}
          <Modal isOpen={this.state.showAddModal}>
            <ModalHeader className='h1'>Add Book</ModalHeader>
            <ModalBody>
              <h6>Title</h6>
              <Input type='text' className='mb-2' />
              <h6>Description</h6>
              <Input type='text' className='mb-2' />
              <h6>Image URL</h6>
              <Input type='text' className='mb-2' />
              <h6>Author</h6>
              <Input type='text' className='mb-2' />
              <h6>Genre</h6>
              <Input type='text' className='mb-2' />
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick=''>Add</Button>
              <Button color='secondary' onClick={this.toggleAddModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* Edit Modal */}
          <Modal isOpen={this.state.showEditModal}>
            <ModalHeader className='h1'>Edit Transaction</ModalHeader>
            <ModalBody>
              <h6>Status</h6>
              <Input type="select" name="select" id="exampleSelect">
                <option>Returned</option>
                <option>Pending</option>
                <option>Penalty</option>
              </Input>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick=''>Edit</Button>
              <Button color='secondary' onClick={this.toggleEditModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* Delete Modal */}
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
        </Container>
      </>
    )
  }
}

export default Transactions