import { GLOBAL_TYPES } from "@redux/actions/globalTypes";

const socketReducer = (state = [], action: any) => {
    switch (action.type) {
        case GLOBAL_TYPES.SOCKET:
            return action.payload;

        default:
            return state;
    }
}


export default socketReducer