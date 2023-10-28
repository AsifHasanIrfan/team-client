import { addUserDesignationDatas, addUserWorkingAsDatas } from "@config/constants"
import { addUserAPISendDataType } from "@config/types"
import { postData } from "@utils/fetchData"
import { getLS, setLS } from "@utils/localStorage"
import { SetStateAction } from "react"
import { toast } from "react-hot-toast"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { GLOBAL_TYPES } from "./globalTypes"
import { TASKS_TYPE } from "./tasks"

export const AUTH_TYPES = {
  AUTH: "AUTH",
  CREATE_LOADING: "CREATE_LOADING",
  SIGNOUT_LOADING: "SIGNOUT_LOADING",
  SIGNIN_LOADING: "SIGNIN_LOADING",
}

// sign up
export const signup = (data: any, token: string, signupState: addUserAPISendDataType, setDatas: (datas: SetStateAction<addUserAPISendDataType>) => void, setSelectedOptions: any, setSelectedWorkingAsOptions: any,) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  try {
    dispatch({ type: AUTH_TYPES.CREATE_LOADING, payload: true })

    // get signup data    
    const res = await postData('signup', data, token)

    if (res.data.success === true) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'success', msg: res.data.message }
      })
      setDatas(signupState);
      setSelectedOptions(addUserDesignationDatas[0]);
      setSelectedWorkingAsOptions(addUserWorkingAsDatas[0]);
    } else {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'error', msg: res.data.message }
      })
    }

    dispatch({ type: AUTH_TYPES.CREATE_LOADING, payload: false })

  } catch (e) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { status: 'error', msg: (e as Error).message }
    })
  }
}


// sign in
export const signin = (data: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  try {
    dispatch({ type: AUTH_TYPES.SIGNIN_LOADING, payload: true })

    const { remembar, ...datas } = data

    // get login data    
    const res = await postData('signin', datas)

    if (res.data.success === true) {
      if (remembar) {
        setLS("rf_token", res.data.refresh_token, 30)
      } else {
        setLS("rf_token", res.data.refresh_token, 7)
      }

      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          token: res.data.token,
          user: res.data.user
        }
      })

      if (res.data.user.role === 'employee') {
        dispatch({
          type: TASKS_TYPE.GET_TASKS,
          payload: res.data.user.tasks
        })
      }

      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'success', msg: res.data.message }
      })
    } else {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'error', msg: res.data.message }
      })
    }

    dispatch({ type: AUTH_TYPES.SIGNIN_LOADING, payload: false })

  } catch (e) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { status: 'error', msg: (e as Error).message }
    })
  }
}


// get refresh token
export const refreshToken = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const refresh_token = getLS("rf_token")

  if (refresh_token) {
    try {
      const res = await postData('refresh-token', { refresh_token })

      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          token: res.data.token,
          user: res.data.user
        }
      })

      if (res.data.user.role === 'employee') {
        dispatch({
          type: TASKS_TYPE.GET_TASKS,
          payload: res.data.user.tasks
        })
      }

      dispatch({ type: GLOBAL_TYPES.REFRESH_TOKEN_LOADING, payload: false })
    } catch (e) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'error', msg: (e as Error).message }
      })

      dispatch({ type: GLOBAL_TYPES.REFRESH_TOKEN_LOADING, payload: false })
    }
  } else {
    dispatch({ type: GLOBAL_TYPES.REFRESH_TOKEN_LOADING, payload: false })
  }
}


// signout 
export const signout = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  try {
    dispatch({ type: AUTH_TYPES.SIGNOUT_LOADING, payload: true })

    localStorage.removeItem("rf_token")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")

    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {}
    })

    toast.success('Signout Success')

    // dispatch({
    //   type: GLOBAL_TYPES.ALERT,
    //   payload: { status: 'success', msg: "Signout Success" }
    // })

    dispatch({ type: AUTH_TYPES.SIGNOUT_LOADING, payload: false })
  } catch (e) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { status: 'error', msg: (e as Error).message }
    })
  }
}
