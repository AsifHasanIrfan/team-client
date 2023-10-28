// internal imports 
import { AUTH_TYPES } from '@redux/actions/auth'
import { TIMEOFF_TYPES } from '@redux/actions/timeoff'
import { USERS_TYPE } from '@redux/actions/users'
import { EditData } from '@utils/fetchData'

// set initial state
const initialState = {
  token: null,
  user: {
    timeOff: [],
    updateRequest: []
  }
}

// set reducer function
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_TYPES.AUTH: {
      localStorage.setItem('token', action.payload.token)
      return action.payload
    }

    case USERS_TYPE.UPDATE_BIO: return {
      ...state,
      user: { ...state.user, bio: action.payload }
    }

    case TIMEOFF_TYPES.UPDATE_STATUS_REALTIME: return {
      ...state,
      user: { ...state.user, timeOff: EditData(state.user.timeOff, action.payload) }
    }

    case TIMEOFF_TYPES.CREATE_TIMEOFF: return {
      ...state,
      user: { ...state.user, timeOff: [...state.user.timeOff, action.payload] }
    }

    case USERS_TYPE.UPDATE_DATA: return {
      ...state,
      user: { ...state.user, ...action.payload }
    }

    case USERS_TYPE.UPDATE_APPROVE: return {
      ...state,
      user: { ...state.user, updateRequest: state.user.updateRequest.filter((e: any) => e.id !== action.payload) }
    }

    case USERS_TYPE.UPDATE_REQUEST: return {
      ...state,
      user: { ...state.user, updateRequest: [state.user.updateRequest.find((e: any) => e.id !== action.payload.id) && action.payload, ...state.user.updateRequest] }
    }

    case TIMEOFF_TYPES.DELETE_TIMEOFF: return {
      ...state,
      user: { ...state.user, timeOff: state.user.timeOff.filter((item: any) => item._id !== action.payload) }
    }

    default: return state
  }
}

export default authReducer

// filter(({ _id })) => _id !== action.payload} 
