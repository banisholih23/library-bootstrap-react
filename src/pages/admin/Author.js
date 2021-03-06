import React, { Component } from 'react';
import TopNavbar from '../Navbar'
import { Container,  Row, Table, Card, CardHeader, CardBody, 
  Modal, ModalHeader, ModalBody, Input, ModalFooter, Button } from 'reactstrap'
import qs from 'querystring'
import SweetAlert from 'react-bootstrap-sweetalert'
import AddAuthor from '../../components/AddAuthor'
import EditAuthor from '../../components/EditAuthor'
import Swal from 'sweetalert2'
import Loading from '../../components/Loadings'

import {connect} from 'react-redux'
import {getAuthor, deleteAuthor} from '../../redux/actions/author'

class Author extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pageInfo: [],
      isLoading: false,
      addModalShow: false,
      alert: null,
      data: []
    }
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  fetchData = async (params) => {
    this.setState({ isLoading: true })
    const param = `${qs.stringify(params)}`
    this.props.getAuthor(param).then((response) => {
			this.setState({isLoading: false})
			if(param){
					this.props.history.push(`?${param}`)
			}
		})
  }

  deleteAuthor = async (id) => {
    this.props.deleteAuthor(id)
    Swal.fire({
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
        onConfirm={() => this.deleteAuthor(id) && this.hideAlert()}
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
    const {dataAuthor} = this.props.author
    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1

    let addModalClose = () => this.setState({ addModalShow: false })
    let editModalClose = () => this.setState({editModalShow:false})
    const {authorid, authorname, authordescription} = this.state

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
                  <CardHeader>Author</CardHeader>
                  <CardBody>
                    <button onClick={() => this.setState({ addModalShow: true })} className="btn btn-success mb-2">Add</button>

                    <AddAuthor
                      show={this.state.addModalShow}
                      onHide={addModalClose}
                      refreshdata={() => this.fetchData()}
                    />

                    <EditAuthor
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      refreshdata={() => this.fetchData()}
                      authorid={authorid}
                      authorname={authorname}
                      authordescription={authordescription}
                    />

                    <Table striped bordered hover>
                      <thead align="center">
                        <tr>
                          <th>No</th>
                          <th>Author</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {dataAuthor.length !== 0 && (
                        <tbody align="center">
                          {dataAuthor.map((author, index) => (
                            <tr key={author.id.toString()} >
                              <td>{index + 1}</td>
                              <td>{author.name}</td>
                              <td>{author.description}</td>
                              <td align="center">
                                <Button onClick={() => {
                                  this.setState({
                                    editModalShow: true,
                                    authorid: author.id,
                                    authorname: author.name,
                                    authordescription: author.description
                                  })
                                }} className="btn btn-warning ml-2 text-white">Edit</Button>

                                <Button onClick={() => { this.onDelete(author.id) }} className="btn btn-danger ml-2 mt-2 align-items-center">Delete</Button>
                                {/*   <button onClick={() =>  { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteAuthor(author.id)} } className="btn btn-danger ml-2">Delete</button> */}
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
        <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className='h1'>Edit Admin</ModalHeader>
          <ModalBody>
            <h6>Name</h6>
            <Input name='name' type='text' className='mb-2' onChange={this.handlerChange} value={this.state.name} />
            <h6>Description</h6>
            <Input name='description' type='text' className='mb-2' onChange={this.handlerChange} value={this.state.description} />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.handlerUpdate}>Edit</Button>
            <Button color='secondary' onClick={this.toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {this.state.isLoading && (<Loading/>)}
      </>
    )
  };
}

const mapStateToProps = state => ({
  author: state.author
})

const mapDispatchToProps = {getAuthor, deleteAuthor}

export default connect(mapStateToProps, mapDispatchToProps)(Author)