import { getData, patchData } from "@utils/fetchData"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { GLOBAL_TYPES } from "./globalTypes"
import axios from 'axios';

export const FORGET_PASSWORD_REQUEST_TYPES = {
    GET_PASSWORD_REQUEST: "GET_PASSWORD_REQUEST",
    GET_LOADING: "GET_LOADING",
    UPDATE_STATUS_LOADING: "UPDATE_STATUS_LOADING",
    UPDATE_STATUS: "UPDATE_STATUS",
}

// get
export const forgetPasswordRequestGet = (token: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        dispatch({ type: FORGET_PASSWORD_REQUEST_TYPES.GET_LOADING, payload: true })

        // get signup data    
        const res = await getData('forget-password', token)

        if (res.data.success === true) {
            dispatch({
                type: FORGET_PASSWORD_REQUEST_TYPES.GET_PASSWORD_REQUEST,
                payload: res.data.datas
            })
        }

        dispatch({ type: FORGET_PASSWORD_REQUEST_TYPES.GET_LOADING, payload: false })

    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// status update
export const forgetPasswordRequestStatusUpdate = (data: any, token: string, requestId: string, setOpen: (open: boolean) => void) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        dispatch({ type: FORGET_PASSWORD_REQUEST_TYPES.UPDATE_STATUS_LOADING, payload: true })

        // get signup data
        const res = await patchData(`/forget-password/${requestId}/update`, data, token)

        if (res.data.success === true) {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })
            dispatch({
                type: FORGET_PASSWORD_REQUEST_TYPES.UPDATE_STATUS,
                payload: [{ ...res.data.updated, ...data }]
            })
            setOpen(false)
        } else {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'error', msg: res.data.message }
            })
        }

        dispatch({ type: FORGET_PASSWORD_REQUEST_TYPES.UPDATE_STATUS_LOADING, payload: false })

    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}