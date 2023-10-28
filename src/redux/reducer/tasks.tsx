// internal imports 
import { TASKS_TYPE } from "@redux/actions/tasks"
import { EditData } from "@utils/fetchData"

// set initial state
const initialState = {
    create_task_loading: false,
    update_task_loading: false,
    get_task_loading: false,
    all_tasks: []
}

// set reducer function
const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TASKS_TYPE.CREATE_TASK_LOADING: return {
            ...state,
            create_task_loading: action.payload
        }

        case TASKS_TYPE.UPDATE_TASK_LOADING: return {
            ...state,
            update_task_loading: action.payload
        }

        case TASKS_TYPE.GET_TASKS_LOADING: return {
            ...state,
            get_task_loading: action.payload
        }

        case TASKS_TYPE.GET_TASKS: return {
            ...state,
            all_tasks: action.payload
        }

        case TASKS_TYPE.UPDATE_TASK: return {
            ...state,
            all_tasks: [action.payload, ...state.all_tasks]
        }

        case TASKS_TYPE.UPDATE_STATUS: return {
            ...state,
            all_tasks: EditData(state.all_tasks, action.payload)
        }

        default: return state
    }
}

export default authReducer