import React, { Component } from 'react'
import TopNavbar from '../Navbar'
import { Container, Row, Table, Card, CardHeader, CardBody, Button } from 'reactstrap'
import qs from 'querystring'
import Loading from '../../components/Loadings'
import swal from 'sweetalert2'

import SweetAlert from 'react-bootstrap-sweetalert'
import {connect} from 'react-redux'
import {getUser, deleteUser} from '../../redux/actions/users'

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

  fetchData = async () => {
    this.setState({ isLoading: true })
    this.props.getUser().then((response) => {
			this.setState({isLoading: false})
		})
  }

  deleteUsers = async (id) => {
    this.props.deleteUser(id)
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Poof! delete success'
    })
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
    const param = qs.parse(this.props.location.search.slice(1))
    await this.fetchData(param)
  }

  render() {

    const {dataUser} = this.props.user
    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    return (
      <>
        <Row className="no-gutters w-100 h-100">
          <div className="d-flex flex-row w-100">
            {/* <Sidebar /> */}
            <div className="w-100 d-flex flex-column">
              <div className="top-navbar sticky-top">
                <TopNavbar />
              </div>
              <Container fluid className="mt-4">
                <Card>
                  <CardHeader>Users</CardHeader>
                  <CardBody>
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
                      {dataUser.length !== 0 && (
                        <tbody align="center">
                          {dataUser.map((users, index) => (
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
                  </CardBody>
                </Card>
              </Container>
            </div>
          </div>
        </Row>
        {this.state.isLoading && (<Loading/>)}
      </>
    )
  };
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {getUser, deleteUser}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
