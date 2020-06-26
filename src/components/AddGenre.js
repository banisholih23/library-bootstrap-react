import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import {getGenre, postGenre} from '../redux/actions/genre'
import swal from 'sweetalert2'

class AddGenre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      created_at: '',
      updated_at: ''
    }
    this.handlePost = this.handlePost.bind(this)
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  fetchData = async () => {
    this.setState({ isLoading: true })
    this.props.getGenre().then((response) => {
        this.setState({ isLoading: false })
    })
  }

  handlePost = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    const genreData = {
      name: this.state.name,
      description: this.state.description,
      created_at: this.state.created_at,
      updated_at: this.state.updated_at
    }
    this.props.postGenre(genreData).then( (response) => {
      swal.fire({
       icon: 'success',
       title: 'Success',
       text: 'Add genre success'
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
            Add Genre
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contaniner">
            <Form onSubmit={this.handlePost}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name Genre</Form.Label>
                <Form.Control name="name" onChange={this.handleChange} type="text" placeholder="Name Genre" />
                <Form.Text className="text-muted">
                  Please text mode
                    </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Created-at</Form.Label>
                <Form.Control name="created_at" onChange={this.handleChange} type="date" placeholder="Created-at" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Updated-at</Form.Label>
                <Form.Control name="updated_at" onChange={this.handleChange} type="date" placeholder="Updated-at" />
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

const mapDispatchToPros = {getGenre, postGenre}

export default connect(null, mapDispatchToPros)(AddGenre)