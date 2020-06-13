const name = 'express library'

require('dotenv').config()

const {REACT_APP_URL} = process.env

const appUrl = (uri) => `${REACT_APP_URL}${uri}`

const template = (status, data, o = {}) => {
  return {
    status,
    data,
    ...o
  }
}

const app = {
  name, appUrl, template
}

module.exports = app