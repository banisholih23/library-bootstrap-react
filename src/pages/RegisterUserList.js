import React, { Component } from 'react'
import { Container, Row, Table, Card } from 'react-bootstrap'

class Users extends Component {

  render() {
    let user = {}
    if (this.props.location.state) {
      const { username, email, password } = this.props.location.state;
      user = { username, email, password }
    }
    return (
      <>
        <Row className="no-gutters w-100 h-100">
          <div className="d-flex flex-row w-100">
            <div className="w-100 d-flex flex-column">
              <div className="top-navbar sticky-top">
              </div>
              <Container fluid className="mt-4">
                <Card>
                  <Card.Header>Users</Card.Header>
                  <Card.Body>

                    <Table striped bordered hover>
                      <thead align="center">
                        <tr>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Password</th>
                        </tr>
                      </thead>
                      <tbody align="center">
                        {user.username && (
                          <tr>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                          </tr>
                        )}
                      </tbody>
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