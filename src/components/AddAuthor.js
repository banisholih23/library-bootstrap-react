import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


import SweetAlert from 'react-bootstrap-sweetalert'

import axios from 'axios'
const {REACT_APP_URL} = process.env


export class AddAuthor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
        }
        this.handlePost = this.handlePost.bind(this)
    }
    

    handleChange = event => {
        this.setState({[  event.target.name]: event.target.value})
    }

    
    handlePost = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
        const authorData = {
            name: this.state.name,
            description: this.state.description
        }
        console.log(this.state)
        const url = `${REACT_APP_URL}books/author`
        console.log(url)
        axios.post(url, authorData).then( (response) => {
           console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
           }) 
           console.log(this.props)
           this.props.onHide()
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
                Add Author
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePost }>
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
                <Button variant="primary" type="submit">
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