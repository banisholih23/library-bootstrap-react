import React, {Component} from 'react'
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'

import HalfCover from '../assets/covernya.png'
import FullCover from '../assets/covernyadilan.png'

class Details extends Component{
  render(){
    return(
      <>
        <Row className="no-gutters">
          <Col md={12}>
            <Row className="no-gutters">
              <Col md={12} className="details">
                <div className="d-flex">
                  <img className="half-cover" src={HalfCover} alt="halfcover" />
                </div>
              </Col>
              <Col className="full-cover">
                <div className="w-100 d-flex justify-content-end">
                  <img src={FullCover} alt="full-cover" />
                </div>
              </Col>
            </Row>
            <Row className="d-flex no-gutters">
              <Col className="book-details container">
                <div className="d-flex pl-5 mt-4">
                  <h4><span class="badge badge-warning text-white">Novel</span></h4>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <div className="info d-flex justify-content-between pl-5">
                  <h1>DILAN 1990</h1>
                  <h5 className='d-flex align-items-center text-success'>Available</h5>
                </div>
                <h5 className="pl-5">30 Juni 2019</h5>
              </Col>
            </Row>
            <Row className="desc d-flex pl-5 mt-4 mb-5">
                <Col md={8}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante imperdiet euismod quis nec massa.
                </Col>
                <Col md={4} className="borrow align-self-end d-flex justify-content-end">
                  <button type='button' className='btn btn-lg btn-warning text-white m-5'>Borrow</button>
                </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

export default Details