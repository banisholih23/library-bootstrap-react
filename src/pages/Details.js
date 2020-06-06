import React, {Component, useState} from 'react'
import {Row, Col, Form, FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import FullCover from '../assets/covernyadilan.png'

class Details extends Component{
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     buttonLabel,
  //     className
  //   }
  // }

  render(){
    return(
      <>
        <div className="details">
          <div className="half-cover">
            <div className='w-100 cover-content d-flex justify-content-between p-4'>
              <div className="back">
                <Link to={'/home'}>
                  <Button className='text-black'>BACK</Button>
                </Link>
              </div>
              <div className='option-btn'>
                <h3>
                  <Link>
                    <Button className='text-black' color="primary">EDIT</Button>
                  </Link> 
                  <Link>
                    <Button className='text-black ml-2' outline color="secondary">DELETE</Button>
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="full-cover w-100 d-flex justify-content-end container">
            <img className='img-fluid' src={FullCover} alt="full-cover" />
          </div>
          <div className="book-details container">
            <div className="tag">
              <h4><span class="badge badge-warning text-white">Novel</span></h4>
            </div>
            <Row>
              <Col md={8}>
                <div className="info d-flex justify-content-between">
                  <h1>DILAN 1990</h1>
                  <h5 className='d-flex align-items-center text-success'>Available</h5>
                </div>
                <h5>30 Juni 2019</h5>
              </Col>
            </Row>
            <Row className="desc d-flex mt-4 mb-5">
                <Col md={8}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante imperdiet euismod quis nec massa.
                </Col>
                <Col md={4} className="borrow align-self-end d-flex justify-content-end">
                  <Button type='button' className='btn btn-lg btn-warning text-white m-5'>Borrow</Button>
                </Col>
            </Row>
          </div>
        </div>
      </>
    )
  }
}

export default Details