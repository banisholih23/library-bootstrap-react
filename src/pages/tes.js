import React, { Component } from 'react'
import {Row, Col, Container, Table, Button} from 'reactstrap'
import axios from 'axios'
import qs from 'querystring'


export default class Users extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      pageInfo: {},
      isLoading: false
    }
  }
  fetchData = async (params) => {
    this.setState({isLoading: true})
    const {REACT_APP_URL} = process.env
    const param = `${qs.stringify(params)}`
    const url = `${REACT_APP_URL}users?${param}`
    const results = await axios.get(url)
    const {data} = results.data
    const pageInfo = {
      page: results.data.page,
      perPage: results.data.per_page,
      total: results.data.total,
      totalPages: results.data.total_pages,
    }
    this.setState({data, pageInfo, isLoading: false})
    if(params){
      this.props.history.push(`?${param}`)
    }
  }
  async componentDidMount(){
    const param = qs.parse(this.props.location.search.slice(1))
    await this.fetchData(param)
  }
  render() {
    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    return (
      <>
        <Container>
          <Row className='mt-5'>
            <Col md={12}>
              {this.state.isLoading &&
                <div className='d-flex justify-content-center align-items-center'>
                  Loading...
                </div>
              }
              {!this.state.isLoading &&(
                <Table bordered>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((user, i) => (
                      <tr key={user.id.toString()}>
                        <td>{`${user.id}`}</td>
                        <td><img src={`${user.avatar}`} alt={`${user.id}`} /></td>
                        <td>{`${user.first_name} ${user.last_name}`}</td>
                        <td>{`${user.email}`}</td>
                        <td align='center'>
                          <Button size='sm' color='success'>Detail</Button>
                          <Button size='sm' color='warning' className='ml-2'>Edit</Button>
                          <Button size='sm' color='danger' className='ml-2'>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Row className='mt-5 mb-5'>
                <Col md={12}>
                  <div className='d-flex flex-row justify-content-between'>
                    <div>
                      {<Button onClick={()=>this.fetchData({...params, page: parseInt(params.page)-1})}>Prev</Button>}
                    </div>
                    <div>
                      {[...Array(this.state.pageInfo.totalPages)].map((o, i)=>{
                        return (
                        <Button onClick={()=>this.fetchData({...params, page: params.page? i+1 : i+1})} className='mr-1 ml-1' key={i.toString()}>{i+1}</Button>
                        )
                      })}
                    </div>
                    <div>
                      <Button onClick={()=>this.fetchData({...params, page: parseInt(params.page)+1})}>Next</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}