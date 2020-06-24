import {combineReducers} from 'redux'
import authReducers from './auth'
import bookReducers from './book'

const reducers = combineReducers({
  auth: authReducers,
  book: bookReducers
})

export default reducers