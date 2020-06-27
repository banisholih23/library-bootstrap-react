import {combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducers from './auth'
import bookReducers from './book'
import genreReducers from './genre'
import userReducers from './users'
import authorReducers from './author'
import transactionsReducers from './transactions'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  auth: authReducers,
  book: bookReducers,
  genre: genreReducers,
  user: userReducers,
  author: authorReducers,
  transactions: transactionsReducers
})

export default persistReducer(persistConfig, reducers)