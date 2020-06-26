const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataAuthor: [],
  pageInfo: []
}

const authorReducers = (state=initialState, action) => {
  switch(action.type){
    case 'GETAUTHOR_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GETAUTHOR_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'GETAUTHOR_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataAuthor: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo
      }
    }
    case 'POSTAUTHOR_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'POSTAUTHOR_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'POSTAUTHOR_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'PATCHAUTHOR_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'PATCHAUTHOR_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'PATCHAUTHOR_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'DELETEAUTHOR_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'DELETEAUTHOR_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'DELETEAUTHOR_FULFILLED': {
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

export default authorReducers