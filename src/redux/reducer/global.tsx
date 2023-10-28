// internal imports
import { AUTH_TYPES } from "@redux/actions/auth"
import { GLOBAL_TYPES } from "@redux/actions/globalTypes"

// initial state
const initialState = {
    ALERT: {},
    loading: false,
    refresh_token_loading: true,
    signin_loading: false,
    signout_loading: false,
    signup_loading: false
}

// reducer function 
const globalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GLOBAL_TYPES.ALERT: return {
            ...state,
            ALERT: action.payload
        }

        case GLOBAL_TYPES.LOADING: return {
            ...state,
            loading: action.payload
        }

        case GLOBAL_TYPES.REFRESH_TOKEN_LOADING: return {
            ...state,
            refresh_token_loading: action.payload
        }

        case AUTH_TYPES.SIGNIN_LOADING: return {
            ...state,
            signin_loading: action.payload
        }

        case AUTH_TYPES.SIGNOUT_LOADING: return {
            ...state,
            signout_loading: action.payload
        }

        case AUTH_TYPES.CREATE_LOADING: return {
            ...state,
            signup_loading: action.payload
        }

        default: return state
    }
}

export default globalReducer