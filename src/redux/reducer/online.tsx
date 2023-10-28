import { GLOBAL_TYPES } from "@redux/actions/globalTypes";

const onlineReducer = (state = [], action: any) => {
    switch (action.type) {
        case GLOBAL_TYPES.ONLINE_USER:
            return [...state, action.payload];

        case GLOBAL_TYPES.OFFLINE_USER:
            return state.filter(item => item !== action.payload)

        default:
            return state;
    }
}


export default onlineReducer