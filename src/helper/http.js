import axios from 'axios'
import qs from 'querystring'
const { REACT_APP_URL } = process.env
const API_TOKEN = localStorage.getItem('token')

export const postLogin = (body) => {
  const data = new URLSearchParams()
  // console.log(data)
	data.append('email', body.email)
	data.append('password', body.password)
	return axios.post(`${REACT_APP_URL}books/auth/login`, data, {
		headers: {
			'Authorization' : `${API_TOKEN}`,
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
}

export const postRegister = (body) => {
  const data = new URLSearchParams()
  data.append('username', body.username)
  data.append('email', body.email)
  data.append('password', body.password)
  return axios.post(`${REACT_APP_URL}books/auth/register`, data, {
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
}