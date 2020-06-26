import React, { Component } from 'react';
import TopNavbar from '../Navbar'
import {  Container, Row, Table, Card, CardHeader,CardBody, Button } from 'reactstrap'
import qs from 'querystring'
import SweetAlert from 'react-bootstrap-sweetalert'
import swal from 'sweetalert2'
import Loading from '../../components/Loadings'
import {connect} from 'react-redux'
import {getTransactions, returnTransactions} from '../../redux/actions/transactions'


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
    const param = `${qs.stringify(params)}`
    this.props.getTransactions(param).then((response) => {
      this.setState({ isLoading: false })
      if (param) {
        this.props.history.push(`?${param}`)
      }
    })
  }

  returnTransactions = async (id) => {
    this.props.returnTransactions(id)
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Delete success'
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
        onConfirm={() => this.returnTransactions(id) && this.hideAlert()}
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
    const { dataTransactions } = this.props.transactions

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
                  <CardHeader>Transactions</CardHeader>
                  <CardBody>
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
                      {dataTransactions.length !== 0 && (
                        <tbody align="center">
                          {dataTransactions.map((transactions, index) => (
                            <tr key={transactions.id.toString()}>
                              <td>{index + 1}</td>
                              <td>{transactions.book_title}</td>
                              <td>{transactions.book_author}</td>
                              <td>{transactions.orderby}</td>
                              <td>{transactions.book_status}</td>
                              <td align="center">
                              <Button onClick={() => { this.onDelete(transactions.id) }} className="btn btn-danger ml-2">Delete</Button>
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
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions
})

const mapDispatchToProps = { getTransactions, returnTransactions }

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)