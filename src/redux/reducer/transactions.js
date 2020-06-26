const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataTransactions: [],
}

const transactionsReducers = (state=initialState, action) => {
  switch(action.type){
    case 'GETTRANSACTIONS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GETTRANSACTIONS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'GETTRANSACTIONS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataTransactions: action.payload.data.data
      }
    }
    case 'POSTTRANSACTIONS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'POSTTRANSACTIONS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'POSTTRANSACTIONS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'RETURNTRANSACTIONS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'RETURNTRANSACTIONS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'RETURNTRANSACTIONS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default transactionsReducers