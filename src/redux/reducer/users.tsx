// internal imports
import { USERS_TYPE } from '@redux/actions/users';

// set initial state
const initialState = {
  all_users: [],
  user: {},
  user_get_loading: false,
  update_user_bio_loading: false,
  update_data_loading: false,
  update_pass_loading: false,
  update_approve_loading: false,
  update_decline_loading: false,
};

// set reducer function
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {

    // case USERS_TYPE.GET_USERS:
    //   return {
    //     ...state,
    //     all_users: action.payload,
    //   };

    case USERS_TYPE.UPDATE_DATA_TEAM:
      return {
        ...state,
        all_users: state.all_users.map((e: any) => e._id == action.payload._id ? { ...e, ...action.payload } : e),
      };

    case USERS_TYPE.GET_SINGLE_USERS:
      return {
        ...state,
        user: action.payload,
      };

    case USERS_TYPE.USER_GET_LOADING:
      return {
        ...state,
        user_get_loading: action.payload,
      };

    case USERS_TYPE.UPDATE_USER_BIO_LOADING:
      return {
        ...state,
        update_user_bio_loading: action.payload,
      };

    case USERS_TYPE.UPDATE_DATA_LOADING:
      return {
        ...state,
        update_data_loading: action.payload,
      };

    case USERS_TYPE.UPDATE_PASS_LOADING:
      return {
        ...state,
        update_pass_loading: action.payload,
      };

    case USERS_TYPE.UPDATE_APPROVE_LOADING:
      return {
        ...state,
        update_approve_loading: action.payload,
      };

    case USERS_TYPE.UPDATE_DECLINE_LOADING:
      return {
        ...state,
        update_decline_loading: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
