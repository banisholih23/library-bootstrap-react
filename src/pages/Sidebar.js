import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

import { Link } from 'react-router-dom';
import avatar from '../assets/myprofile.png'

class Sidebar extends Component {
    render() {
        return (
            <>
                <Navbar bg="light" expand="sm" className="d-none d-md-block sidebar shadow">
                    <div className="avatar-img">
                        <img src={avatar} alt="avatar" />
                        <h4 className="text-center pr-5 mt-2">Bani Sholih</h4>
                    </div>
                    <div className="nav-side mt-5">
                        <Nav.Item>
                            <Link className="nav-link text-decoration-none text-white" to="/home"> Dashboard</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link text-decoration-none text-white" to="/author"> Author</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link text-decoration-none text-white" to="/genres"> Genre</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link text-decoration-none text-white" to="/transactions"> Transaction</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link text-decoration-none text-white" to="/users"> User</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link text-decoration-none text-white" to="/login"> Logout</Link>
                        </Nav.Item>
                    </div>
                </Navbar>
            </>
        )
    }
}
export default Sidebar