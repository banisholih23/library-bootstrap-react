import React, { Component } from 'react';
import TopNavbar from '../pages/NavbarUser'
import { Container, Row, Table, Card, CardHeader, CardBody, Button} from 'reactstrap'
import qs from 'querystring'
import Loading from '../components/Loadings'
import { connect } from 'react-redux'
import { getTransactions, returnTransactions } from '../redux/actions/transactions'
import swal from 'sweetalert2'

class Transactions extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      data: [],
      pageInfo: [],
      isLoading: false,
      addModalShow: false
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
      text: 'return success'
    })
    this.fetchData()
  }

  toggleReturnModal = () => {
    this.setState({
      showBorrowModal: !this.state.showBorrowModal
    })
  }

  showModal = () => {
    this.setState({ show: true });
  };

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
                  <CardHeader>History Transactions</CardHeader>
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
                                <Button onClick={() => { this.returnTransactions(transactions.id) }} className="btn btn-info ml-2">Return Book</Button>
                              </td>
                              {this.state.alert}
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </Table>
                  </CardBody>
                </Card>
              </Container>
            </div>
          </div>
        </Row>
        {this.state.isLoading && (<Loading />)}
      </>
    )
  };
}

const mapStateToProps = state => ({
  transactions: state.transactions
})

const mapDispatchToProps = { getTransactions, returnTransactions }

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)