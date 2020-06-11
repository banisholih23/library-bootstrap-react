import React, {Component} from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import axios from 'axios'

import Login from './pages/Login'
import Register from './pages/Register' 
import Home from './pages/Home'
import DetailsTry from './pages/DetailsTry'
import LoginAdmin from './pages/LoginAdmin'
import Sidebar from './pages/Sidebar'
import Navbar from './pages/Navbar'
import Author from './pages/admin/Author'
import Genres from './pages/admin/Genre'
import Users from './pages/admin/Users'
import Transactions from './pages/admin/Transactions'
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
            <Route path='/home' component={Home} />
            <Route path='/detailstry/:id' exact component={DetailsTry} />
            <Route path='/adminlogin' exact component={LoginAdmin} />
            <Route path='/sidebar' exact component={Sidebar} />
            <Route path='/navbar' exact component={Navbar} />
            <Route path="/author" exact component={Author}/>
            <Route path="/genres" exact component={Genres}/>
            <Route path="/users" exact component={Users}/>
            <Route path="/transactions" exact component={Transactions}/>
            {/* <Route path='/list-book'  component={ListBook} /> */}
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App