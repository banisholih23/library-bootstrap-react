import React, { Component } from 'react';
import TopNavbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Container, Row, Table, Card, Pagination } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, Input, ModalFooter, Button } from 'reactstrap'
import axios from 'axios'
import qs from 'querystring'
import SweetAlert from 'react-bootstrap-sweetalert'

import { EditTransactions } from '../../components/EditTransactions'

class Transactions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pageInfo: [],
      isLoading: false,
      addModalShow: false,
      alert: null,
    }
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  fetchData = async (params) => {
    this.setState({ isLoading: true })
    const { REACT_APP_URL } = process.env
    const param = `${qs.stringify(params)}`
    const url = `${REACT_APP_URL}books/transactions?${param}`
    const results = await axios.get(url)
    const { data } = results.data

    const pageInfo = results.data.pageInfo
    this.setState({ data, pageInfo, isLoading: false })
    if (params) {
      this.props.history.push(`?${param}`)
    }
  }

  deleteTransactions = async (id) => {
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books/transactions/${id}`
    await axios.delete(url)
    console.log(this.props)

    this.fetchData()
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onDelete = (id) => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => this.deleteTransactions(id) && this.hideAlert()}
        onCancel={() => this.hideAlert()}
        focusCancelBtn
      >
        Delete this id {id}
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

  async componentDidMount() {
    /*        const results = await axios.get('https://api-muhilibrary.herokuapp.com/books?limit=10')
           const {data} = results
           this.setState(data)  */
    const param = qs.parse(this.props.location.search.slice(1))
    await this.fetchData(param)
  }

  render() {
    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    let addModalClose = () => this.setState({ addModalShow: false })
    let editModalClose = () => this.setState({editModalShow:false})
    const {transactionsid, book_id, user_id, status_id } = this.state
    return (
      <>
        <Row className="no-gutters w-100 h-100">
          <div className="d-flex flex-row w-100">
            <Sidebar />
            <div className="w-100 d-flex flex-column">
              <div className="top-navbar sticky-top">
                <TopNavbar />
              </div>
              <Container fluid className="mt-4">
                <Card>
                  <Card.Header>Genre</Card.Header>
                  <Card.Body>
                  <button onClick={() => this.setState({ addModalShow: true })} className="btn btn-success mb-2">Add</button>

                  <EditTransactions
                    show={this.state.editModalShow}
                    onHide={editModalClose}
                    refreshdata={() => this.fetchData()}
                    transactionsid={transactionsid}
                    book_id={book_id}
                    user_id={user_id}
                    status_id={status_id}
                  />

                    <Table striped bordered hover>
                      <thead align="center">
                        <tr>
                          <th>Id</th>
                          <th>Title</th>
                          <th>Author</th>
                          <th>OrderBy</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      {this.state.data.length !== 0 && (
                        <tbody align="center">
                          {this.state.data.map((transactions, index) => (
                            <tr key={transactions.id.toString()}>
                              <td>{index + 1}</td>
                              <td>{transactions.book_title}</td>
                              <td>{transactions.book_author}</td>
                              <td>{transactions.orderby}</td>
                              <td>{transactions.status}</td>
                              <td align="center">
                                <Button onClick={() => {
                                  this.setState({
                                    editModalShow: true,
                                    transactionsid: transactions.id,
                                    transactionsauthor: transactions.book_author,
                                    transactionsorderby: transactions.orderby,
                                    transactionsstatus: transactions.status
                                  })
                                }} className="btn btn-warning ml-2">Edit</Button>

                                <Button onClick={() => { this.onDelete(transactions.id) }} className="btn btn-danger ml-2 mt-2">Delete</Button>
                              </td>
                              {this.state.alert}
                            </tr>
                          ))}
                        </tbody>
                      )}
                      {/* {this.state.data.length === 0 && (
                        <h1>Data Not Available</h1>
                      )} */}
                    </Table>
                  </Card.Body>
                </Card>
              </Container>
            </div>
          </div>
        </Row>
      </>
    )
  };
}
export default Transactions