import { getAuthAction, pending, rejected, fulfilled } from '../actions/actionTypes'
const initialState = {
  data: [],
  isLoading: false,
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const authReducers = (state = initialState, action) => {
  switch (action.type) {
       case  getAuthAction + pending:
          return {
              ...state,
              isLoading: true,
              isPending: true,
              isRejected: false,
              isFulfilled: false
          }
       case  getAuthAction + rejected:
          return {
              ...state,
             isRejected: true,
              isLoading: false
          }
       case  getAuthAction + fulfilled:
          return {
              ...state,
              isFulfilled: true,
              isLoading: true,
              dataAuth: state.data
          }
      default: return state
  }
}

export default authReducers