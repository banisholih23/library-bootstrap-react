import {combineReducers} from 'redux'
import authReducers from './auth'
import bookReducers from './book'
import genreReducers from './genre'
import userReducers from './users'
import authorReducers from './author'

const reducers = combineReducers({
  auth: authReducers,
  book: bookReducers,
  genre: genreReducers,
  user: userReducers,
  author: authorReducers
})

export default reducers