import React, {Component} from 'react'
import axios from 'axios'
import {Container,Row, Col, Table, Button} from 'reactstrap'


class ListData extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  async componentDidMount(){
    const results = await axios.get('https://jsonplaceholder.typicode.com/users')
    const {data} = results
    this.setState({data})
  }
  render(){
    return(
      <>
        <Container>
          <Row>
            <Col md={3}>
              <Button onClick={()=>this.setState({data: []})}>Reset</Button>
            </Col>
            <Col md={9}>
              {this.state.data.length !== 0 &&(
                <Table bordered>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Website</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((user, index) => (    
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.website}</td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              {this.state.data.length===0 &&(
                <h1>Data is not available!</h1>
              )}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default ListData