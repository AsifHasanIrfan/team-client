// internal imports 
import { TIMEOFF_TYPES } from '@redux/actions/timeoff'
import { EditData } from '@utils/fetchData'

// set initial state 
const initialState = {
    timeoff_datas: [],
    timeoff_create_loading: false,
    timeoff_get_loading: false,
    timeoff_update_loading: false,
    timeoff_delete_loading: false,
}

// set reducer function
const timeoffReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TIMEOFF_TYPES.TIMEOFF_CREATE_LOADING: return {
            ...state,
            timeoff_create_loading: action.payload
        }

        case TIMEOFF_TYPES.TIMEOFF_GET_LOADING: return {
            ...state,
            timeoff_get_loading: action.payload
        }

        case TIMEOFF_TYPES.TIMEOFF_UPDATE_LOADING: return {
            ...state,
            timeoff_update_loading: action.payload
        }

        case TIMEOFF_TYPES.GET_TIMEOFF: return {
            ...state,
            timeoff_datas: action.payload
        }

        case TIMEOFF_TYPES.UPDATE_TIMEOFF_ADMIN: return {
            ...state,
            timeoff_datas: [action.payload, ...state.timeoff_datas]
        }

        case TIMEOFF_TYPES.UPDATE_STATUS: return {
            ...state,
            timeoff_datas: EditData(state.timeoff_datas, action.payload)
        }

        case TIMEOFF_TYPES.TIMEOFF_DELETE_LOADING: return {
            ...state,
            timeoff_delete_loading: action.payload
        }

        default: return state
    }
}

export default timeoffReducer