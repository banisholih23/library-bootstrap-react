import React, { Component } from 'react';
import TopNavbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Container, Row, Table, Card, Pagination } from 'react-bootstrap';
import axios from 'axios'
import qs from 'querystring'

class Genre extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pageInfo: [],
      isLoading: false
    }
  }

  fetchData = async (params) => {
    this.setState({ isLoading: true })
    const { REACT_APP_URL } = process.env
    const param = `${qs.stringify(params)}`
    const url = `${REACT_APP_URL}books/genres?${param}`
    const results = await axios.get(url)
    const { data } = results.data

    const pageInfo = results.data.pageInfo
    this.setState({ data, pageInfo, isLoading: false })
    if (params) {
      this.props.history.push(`?${param}`)
    }
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
                    <button className="btn btn-success mb-2">Add</button>
                    <Table striped bordered hover>
                      <thead align="center">
                        <tr>
                          <th>No</th>
                          <th>Name Genre</th>
                          <th>Created-at</th>
                          <th>Updated-at</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {this.state.data.length !== 0 && (
                        <tbody align="center">
                          {this.state.data.map((genre, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{genre.name}</td>
                              <td>{genre.created_at}</td>
                              <td>{genre.updated_at}</td>
                              <td align="center">
                                <button className="btn btn-warning ml-2">Edit</button>
                                <button className="btn btn-danger ml-2">Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                      {this.state.data.length === 0 && (
                        <h1>Data Not Available</h1>
                      )}
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
export default Genre