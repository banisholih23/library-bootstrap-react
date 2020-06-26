import http from '../../services/http'
const { REACT_APP_URL } = process.env

const getUser = (param) => {
  const url = `${REACT_APP_URL}books/auth/users?${param}`
  return {
    type: 'GETUSER',
    payload: http().get(url)
  }
}

const deleteUser = (id) => {
  const url = `${REACT_APP_URL}books/auth/users/${id}`
  return {
    type: 'DELETEUSER',
    payload: http().delete(url)
  }
}

export {getUser, deleteUser}