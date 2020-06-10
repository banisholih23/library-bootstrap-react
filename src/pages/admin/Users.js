import React, { Component } from 'react'
import TopNavbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Container, Row, Table, Card, Pagination } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, Input, ModalFooter, Button } from 'reactstrap'
import axios from 'axios'
import qs from 'querystring'

import SweetAlert from 'react-bootstrap-sweetalert'

class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pageInfo: [],
      isLoading: false,
      // addModalShow: false,
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
    const url = `${REACT_APP_URL}books/auth/users?${param}`
    const results = await axios.get(url)
    const { data } = results.data

    const pageInfo = results.data.pageInfo
    this.setState({ data, pageInfo, isLoading: false })
    if (params) {
      this.props.history.push(`?${param}`)
    }
  }

  deleteUsers = async (id) => {
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books/auth/users/${id}`
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
        onConfirm={() => this.deleteUsers(id) && this.hideAlert()}
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
    const {userid, username, useremail, userpassword} = this.state
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
                  <Card.Header>Users</Card.Header>
                  <Card.Body>

                    <Table striped bordered hover>
                      <thead align="center">
                        <tr>
                          <th>No</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Password</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {this.state.data.length !== 0 && (
                        <tbody align="center">
                          {this.state.data.map((users, index) => (
                            <tr key={users.id.toString()}>
                              <td>{index + 1}</td>
                              <td>{users.username}</td>
                              <td>{users.email}</td>
                              <td>{users.password}</td>
                              <td align="center">

                                <Button onClick={() => { this.onDelete(users.id) }} className="btn btn-danger ml-2 mt-2">Delete</Button>
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
export default Users
