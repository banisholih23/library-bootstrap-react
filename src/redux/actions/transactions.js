import http from '../../services/http'
const {REACT_APP_URL} = process.env

const getTransactions = (param) => {
  const url = `${REACT_APP_URL}books/transactions?${param}`
  return {
    type: 'GETTRANSACTIONS',
    payload: http().get(url)
  }
}

const postTransactions = (dataPost) => {
  const url = `${REACT_APP_URL}books/transactions`
  return {
    type: 'POSTTRANSACTIONS',
    payload: http().post(url, dataPost)
  }
}

const returnTransactions = (id) => {
  const url = `${REACT_APP_URL}books/transactions/${id}`
  return {
    type: 'RETURNTRANSACTIONS',
    payload: http().delete(url)
  }
}


export { getTransactions, postTransactions, returnTransactions }