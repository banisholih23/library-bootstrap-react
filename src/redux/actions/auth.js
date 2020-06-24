import {getAuthAction, getAuthRegister} from './actionTypes'
import { postLogin, postRegister } from '../../helper/http'
import Swal from 'sweetalert2'

export const requestLogin = (data, props) => {
  return {
    type: getAuthAction,
    payload: postLogin(data).then(res => {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.data.token)
        props.history.push('/home') 
       
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Good! You're Logged In"
        })
      }
    }).catch(function (error) {
      console.log(error.response);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: "Something's wrong dude"
      })
    })
  }
}

export const requestRegister = (data, props) => {
  return {
    type: getAuthRegister,
    payload: postRegister(data).then(result => {
      if (result.status === 200) {
        props.history.push('/user')
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Good! Thank You For Register and Please Login"
        })
      }
    }).catch(function (error) {
      console.log(error.response);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: "Something's wrong dude"
      })
    })
  }
}
