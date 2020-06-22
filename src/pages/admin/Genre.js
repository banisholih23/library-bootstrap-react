import React, { Component } from 'react';
import TopNavbar from '../Navbar'
import { Container, Row, Table, Card, Button, CardHeader, CardBody} from 'reactstrap';
import axios from 'axios'
import qs from 'querystring'
import SweetAlert from 'react-bootstrap-sweetalert'

import { AddGenre } from '../../components/AddGenre'
import { EditGenre } from '../../components/EditGenre'
import Loading from '../../components/Loadings'

class Genre extends Component {

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
    const url = `${REACT_APP_URL}books/genres?${param}`
    const results = await axios.get(url)
    const { data } = results.data

    const pageInfo = results.data.pageInfo
    this.setState({ data, pageInfo, isLoading: false })
    if (params) {
      this.props.history.push(`?${param}`)
    }
  }

  deleteGenre = async (id) => {
    const { REACT_APP_URL } = process.env
    const url = `${REACT_APP_URL}books/genres/${id}`
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
        onConfirm={() => this.deleteGenre(id) && this.hideAlert()}
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
    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    let addModalClose = () => this.setState({ addModalShow: false })
    let editModalClose = () => this.setState({editModalShow:false})
    const {genreid, genrename, genrecreated_at, genreupdated_at} = this.state
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
                  <CardHeader>Genre</CardHeader>
                  <CardBody>
                  <button onClick={() => this.setState({ addModalShow: true })} className="btn btn-success mb-2">Add</button>

                  <AddGenre
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    refreshdata={() => this.fetchData()}
                  />

                  <EditGenre
                    show={this.state.editModalShow}
                    onHide={editModalClose}
                    refreshdata={() => this.fetchData()}
                    genreid={genreid}
                    genrename={genrename}
                    genrecreated_at={genrecreated_at}
                    genreupdated_at={genreupdated_at}
                  />

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
                            <tr key={genre.id.toString()}>
                              <td>{index + 1}</td>
                              <td>{genre.name}</td>
                              <td>{genre.created_at}</td>
                              <td>{genre.updated_at}</td>
                              <td align="center">
                                <Button onClick={() => {
                                  this.setState({
                                    editModalShow: true,
                                    genreid: genre.id,
                                    genrename: genre.name,
                                    genrecreated_at: genre.created_at,
                                    genreupdated_at: genre.updated_at
                                  })
                                }} className="btn btn-warning ml-2 text-white">Edit</Button>

                                <Button onClick={() => { this.onDelete(genre.id) }} className="btn btn-danger ml-2">Delete</Button>
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
export default Genre