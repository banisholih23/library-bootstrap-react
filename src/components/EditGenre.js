import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


import SweetAlert from 'react-bootstrap-sweetalert'

import axios from 'axios'
const {REACT_APP_URL} = process.env


export class EditGenre extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            created_at: '',
            updated_at: '',
            alert: ''
        }
        this.handlePatch = this.handlePatch.bind(this)
    }
    

    handleChange = event => {
        this.setState({[  event.target.name]: event.target.value})
    }
       
    handlePatch = async (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
 
        const authorData = {
            name: this.state.name,
            created_at: this.state.created_at,
            updated_at: this.state.updated_at
        }

        const url = `${REACT_APP_URL}books/genres/${this.props.genreid}`
        await axios.patch(url, authorData).then( (response) => {
          })
          .catch(function (error) {
            console.log(error.response);
           }) 
          
           this.props.refreshdata()
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
                Edit Author
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePatch}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>ID Genre</Form.Label>
                    <Form.Control 
                        name="id" 
                        readOnly 
                        onChange={this.handleChange} 
                        type="text" placeholder="ID Genre" 
                        defaultValue={this.props.genreid}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name Genre</Form.Label>
                    <Form.Control 
                        name="name" 
                        onChange={this.handleChange} 
                        type="text" placeholder="Name Author" 
                        defaultValue={this.props.genrename}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Created-at</Form.Label>
                    <Form.Control 
                        name="created_at" 
                        onChange={this.handleChange} 
                        type="date" placeholder="Created_at" 
                        defaultValue={this.props.genrecreated_at}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Updated-at</Form.Label>
                    <Form.Control 
                        name="updated_at" 
                        onChange={this.handleChange} 
                        type="date" placeholder="Updated-at" 
                        defaultValue={this.props.genreupdated_at}/>
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