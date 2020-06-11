import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


import SweetAlert from 'react-bootstrap-sweetalert'

import axios from 'axios'
const {REACT_APP_URL} = process.env


export class EditTransactions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book_id: '',
            user_id: '',
            status_id: '',
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
            book_id: this.state.book_id,
            user_id: this.state.user_id,
            status_id: this.state.status_id,
        }

        const url = `${REACT_APP_URL}books/transactions/${this.props.transactionsid}`
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
                Edit Transactions
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePatch}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>ID Transactions</Form.Label>
                    <Form.Control 
                        name="id" 
                        readOnly 
                        onChange={this.handleChange} 
                        type="text" placeholder="ID Transactions" 
                        defaultValue={this.props.transactionsid}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>ID Book</Form.Label>
                    <Form.Control 
                        name="book_id" 
                        onChange={this.handleChange} 
                        type="text" placeholder="Book ID" 
                        defaultValue={this.props.transactionsbook_id}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                {/* <Form.Group controlId="formBasicEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control 
                        name="book_id" 
                        onChange={this.handleChange} 
                        type="text" placeholder="Author" 
                        defaultValue={this.props.transactionsbook_id}/>
                </Form.Group> */}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Order By</Form.Label>
                    <Form.Control 
                        name="user_id" 
                        onChange={this.handleChange} 
                        type="text" placeholder="User ID" 
                        defaultValue={this.props.transactionsuser_id}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    <Form.Control 
                        name="status_id" 
                        onChange={this.handleChange} 
                        type="text" placeholder="Status ID" 
                        defaultValue={this.props.transactionsstatus_id}/>
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