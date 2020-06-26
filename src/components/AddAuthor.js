import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import {getAuthor, postAuthor} from '../redux/actions/author'
import swal from 'sweetalert2'


class AddAuthor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
    }
    this.handlePost = this.handlePost.bind(this)
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  fetchData = async () => {
    this.setState({ isLoading: true })
    this.props.getAuthor().then((response) => {
        this.setState({ isLoading: false })
    })
  }

  handlePost = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    const authorData = {
      name: this.state.name,
      description: this.state.description
    }
    this.props.postAuthor(authorData).then( (response) => {
      swal.fire({
       icon: 'success',
       title: 'Success',
       text: 'Add author success'
     })
     this.fetchData()
     this.props.onHide()
    })
  }


  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Author
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contaniner">
            <Form onSubmit={this.handlePost}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name Author</Form.Label>
                <Form.Control name="name" onChange={this.handleChange} type="text" placeholder="Name Author" />
                <Form.Text className="text-muted">
                  Please text mode
                    </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" onChange={this.handleChange} type="text" placeholder="Description" />
              </Form.Group>
              <Button onSubmit={this.handlePost} variant="primary" type="submit">
                Save
                </Button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button varian="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

    )
  }
}
const mapDispatchToPros = {getAuthor, postAuthor}

export default connect(null, mapDispatchToPros)(AddAuthor)