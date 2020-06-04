import React, {Component} from 'react'

class ListBook extends Component{
  
  render(){
    return(
      <>
      Hello {this.props.location.state.userData.email}!
      </>
    )
  }
}

export default ListBook