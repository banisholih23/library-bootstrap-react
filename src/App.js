import React, {Component} from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import axios from 'axios'

import Login from './pages/Login'
import Register from './pages/Register'
import Details from './pages/Details' 
import Home from './pages/Home'
import DetailsTry from './pages/DetailsTry'
import LoginAdmin from './pages/LoginAdmin'
import Transactions from './pages/Transactions'
// import ListBook from './pages/ListBook'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  async componentDidMount(){
    const results = await axios.get('http://localhost:5000/books')
    const {data} = results.data
    this.setState({data})
    console.log(data)
  }

  render(){
    return(
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/details' exact component={Details} />
            <Route path='/home' component={Home} />
            <Route path='/detailstry/:id' exact component={DetailsTry} />
            <Route path='/adminlogin' exact component={LoginAdmin} />
            <Route path='/transactions' exact component={Transactions} />
            {/* <Route path='/list-book'  component={ListBook} /> */}
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App