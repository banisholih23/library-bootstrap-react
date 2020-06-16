import React, { Component } from 'react'
import styled from 'styled-components'

import {Spinner} from 'reactstrap'

const Parent = styled('div')`
  position: fixed;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index:9999;
  top:0;
  left:0;
`

const Child = styled(Spinner)`
  color: #fff;
  width: 4rem;
  height: 4rem;
`

export default class Loading extends Component {
  constructor(props){
    super(props)
    this.bodyClass = document.getElementsByTagName('body')[0].classList
  }
  componentDidMount(){
    this.bodyClass.add('modal-open')
  }
  componentWillUnmount(){
    this.bodyClass.remove('modal-open')
  }
  render() {
    return (
      <Parent>
        <Child/>
      </Parent>
    )
  }
}