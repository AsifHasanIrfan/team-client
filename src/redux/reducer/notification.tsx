// internal imports 
import { NOTIFICATION_TYPES } from '@redux/actions/notification';
import { EditData } from '@utils/fetchData'

// set initial state 
const initialState = {
    loading: false,
    data: [],
    sound: false
}

// set reducer function
const notificationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case NOTIFICATION_TYPES.GET_NOTIFIES:
            return {
                ...state,
                data: action.payload
            };

        case NOTIFICATION_TYPES.CREATE_NOTIFY:
            return {
                ...state,
                data: [action.payload, ...state.data]
            };

        case NOTIFICATION_TYPES.REMOVE_NOTIFY:
            return {
                ...state,
                data: state.data.filter((item: any) => (
                    item.id !== action.payload.id
                ))
            };

        case NOTIFICATION_TYPES.UPDATE_NOTIFY:
            return {
                ...state,
                data: action.payload.data
            };

        case NOTIFICATION_TYPES.UPDATE_SOUND:
            return {
                ...state,
                sound: action.payload
            };

        case NOTIFICATION_TYPES.UNREAD_ALL_NOTIFIES:
            return {
                ...state,
                data: state.data.map((item: any) => ({ ...item, isRead: action.payload }))
            };

        case NOTIFICATION_TYPES.ARCHIVE_ALL_NOTIFIES:
            return {
                ...state,
                data: state.data.map((item: any) => ({ ...item, isArchived: action.payload }))
            };

        case NOTIFICATION_TYPES.GET_NOTIFICATION_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        default: return state
    }
}

export default notificationReducer