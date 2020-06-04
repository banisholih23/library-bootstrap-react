import React, {Component} from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

// import Helo from './components/Greetings'

import Login from './pages/Login'
import Register from './pages/Register'
import Details from './pages/Details' 
// import ListBook from './pages/ListBook'

class App extends Component{
  render(){
    return(
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/details' exact component={Details} />
            {/* <Route path='/list-book'  component={ListBook} /> */}
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App