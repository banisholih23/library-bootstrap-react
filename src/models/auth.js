import Axios from 'axios'

import {
  appUrl,
} from '../config/app'

import qs from 'querystring'

const auth = {
  register: (data) => {
    const { email, password } = data
    return Axios.post(appUrl('books/auth/register'), qs.stringify({ email, password }))
  },
  login: (data) => {
    const { email, password } = data
    return Axios.post(appUrl('books/auth/login'), qs.stringify({ email, password }))
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('session_user')
  },
}

export default auth