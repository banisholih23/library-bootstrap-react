import http from '../../services/http'
const {REACT_APP_URL} = process.env

const getBook = (param) =>{
const url = `${REACT_APP_URL}books?${param}`
return {
  type: 'GETBOOK',
  payload: http().get(url)
  }
}

const postBook = (dataPost) =>{
const url = `${REACT_APP_URL}books`
return {
  type: 'POSTBOOK',
  payload: http().post(url, dataPost)
  }
}

const patchBook = (id, dataBook) =>{
const url = `${REACT_APP_URL}books/${id}`
return {
  type: 'PATCHBOOK',
  payload: http().patch(url, dataBook)
  }
}

const deleteBook = (id) =>{
const url = `${REACT_APP_URL}books/${id}`
return {
  type: 'DELETEBOOK',
  payload: http().delete(url)
  }
}


export {getBook, deleteBook, postBook, patchBook}