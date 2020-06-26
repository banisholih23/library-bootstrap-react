import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

import { connect } from 'react-redux'
import { patchAuthor, getAuthor } from '../redux/actions/author'
import swal from 'sweetalert2'

class EditAuthor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            alert: ''
        }
        this.handlePatch = this.handlePatch.bind(this)
    }
    

    handleChange = event => {
        this.setState({[  event.target.name]: event.target.value})
    }

    fetchData = async () => {
        this.setState({ isLoading: true })
        this.props.getAuthor().then((response) => {
            this.setState({ isLoading: false })
        })
    }
       
    handlePatch = async (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
 
        const authorData = {
            name: this.state.name,
            description: this.state.description
        }

        this.props.patchAuthor(`${this.props.authorid}`, authorData).then((response) => {
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Edit author success'
            })
            this.fetchData()
            this.props.onHide()
        })
    }
    render(){
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Author
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePatch}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>ID Author</Form.Label>
                    <Form.Control 
                        name="id" 
                        readOnly 
                        onChange={this.handleChange} 
                        type="text" placeholder="ID Author" 
                        defaultValue={this.props.authorid}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name Author</Form.Label>
                    <Form.Control 
                        name="name" 
                        onChange={this.handleChange} 
                        type="text" placeholder="Name Author" 
                        defaultValue={this.props.authorname}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        name="description" 
                        onChange={this.handleChange} 
                        type="text" placeholder="Description" 
                        defaultValue={this.props.authordescription}/>
                </Form.Group>
                <Button onClick={this.handlePatch} variant="primary" type="submit">
                    Update
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

const mapDispatchToProps = { patchAuthor, getAuthor }

export default connect(null, mapDispatchToProps)(EditAuthor)