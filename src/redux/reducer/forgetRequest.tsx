// internal imports 
import { FORGET_PASSWORD_REQUEST_TYPES } from '@redux/actions/forgetRequest'
import { EditData } from '@utils/fetchData'

// set initial state 
const initialState = {
    forget_request_datas: [],
    forget_request_loading: false,
    forget_request_update_loading: false,
}

// set reducer function
const forgetPasswordRequesrReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case FORGET_PASSWORD_REQUEST_TYPES.GET_PASSWORD_REQUEST: return {
            ...state,
            forget_request_datas: action.payload
        }

        case FORGET_PASSWORD_REQUEST_TYPES.GET_LOADING: return {
            ...state,
            forget_request_loading: action.payload
        }

        case FORGET_PASSWORD_REQUEST_TYPES.UPDATE_STATUS_LOADING: return {
            ...state,
            forget_request_update_loading: action.payload
        }

        case FORGET_PASSWORD_REQUEST_TYPES.UPDATE_STATUS: return {
            ...state,
            forget_request_datas: EditData(state.forget_request_datas, action.payload)
        }


        default: return state
    }
}

export default forgetPasswordRequesrReducer