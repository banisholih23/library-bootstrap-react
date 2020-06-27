import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import axios from 'axios'

import LoginAdmin from './pages/LoginAdmin'
import LoginUser from './pages/LoginUser'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import DetailsHome from './pages/DetailsHome'
import DetailsTry from './pages/DetailsTry'
import Sidebar from './pages/Sidebar'
import Navbar from './pages/Navbar'
import Author from './pages/admin/Author'
import Genres from './pages/admin/Genre'
import Users from './pages/admin/Users'
import Transactions from './pages/admin/Transactions'
import HomeUser from './pages/HomeUser'
import HomeFirst from './pages/HomeFirst'
import DetailsUser from './pages/DetailsUser'
import TransactionsUser from './pages/TransactionsUser'

import RegisterPageTask from './pages/RegisterPageTask'
import RegisterUserList from './pages/RegisterUserList'
import {store, persistor} from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      data: []
    }
    this.checkLogin = () => {
      if (localStorage.getItem('token')) {
        this.setState({ isLogin: true })
      } else {
        this.setState({ isLogin: false })
      }
    }
  }
  async componentDidMount() {
    this.checkLogin()
    const results = await axios.get('http://localhost:5000/books')
    const { data } = results.data
    this.setState({ data })
    console.log(data)
  }

  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <Switch>
                <Route path='/' exact component={HomeFirst} />
                <Route path='/home' exact render={(props) => <HomeUser {...props} />} />
                <Route path='/admin' render={(props) => <LoginAdmin {...props} check={() => this.checkLogin()} />} exact />
                <Route path='/user' render={(props) => <LoginUser {...props} check={() => this.checkLogin()} />} exact />
                <Route path='/dashboard' render={(props) => <Dashboard {...props} />} exact></Route>
                <Route path='/register' exact component={Register} />
                <Route path='/detailstry/:id' exact component={DetailsTry} />
                <Route path='/detailshome/:id' exact component={DetailsHome} />
                <Route path='/detailsuser/:id' exact component={DetailsUser} />
                <Route path='/sidebar' exact component={Sidebar} />
                <Route path='/navbar' exact component={Navbar} />
                <Route path="/author" exact component={Author} />
                <Route path="/genres" exact component={Genres} />
                <Route path="/users" exact component={Users} />
                <Route path="/transactions" exact component={Transactions} />
                <Route path="/transactionsUser" exact component={TransactionsUser} />
                <Route path="/registerpage" exect component={RegisterPageTask} />
                <Route path="/registerlist" exect component={RegisterUserList} />
              </Switch>
            </Router>
          </PersistGate>
        </Provider>
      </>
    )
  }
}

export default App