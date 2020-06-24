import http from '../../services/http'
const {REACT_APP_URL} = process.env

const getBook = (param) =>{
const url = `${REACT_APP_URL}books?${param}`
return {
  type: 'GETBOOK',
  payload: http().get(url)
  }
}

const postBook = (dataSubmit) =>{
const url = `${REACT_APP_URL}books`
return {
  type: 'POSTBOOK',
  payload: http().post(url, dataSubmit)
  }
}

const patchBook = (id, bookData) =>{
const url = `${REACT_APP_URL}books/${id}`
return {
  type: 'PATCHBOOK',
  payload: http().patch(url, bookData)
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