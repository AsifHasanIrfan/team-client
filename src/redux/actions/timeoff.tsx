import { SendTimeoffAPISendDataType } from "@config/types"
import { deleteData, getData, patchData, postData } from "@utils/fetchData"
import { SetStateAction } from "react"
import { AnyAction } from "redux"
import { ThunkDispatch } from 'redux-thunk'
import { GLOBAL_TYPES } from "./globalTypes"
import { createNotification } from "./notification"
import axios from 'axios';

export const TIMEOFF_TYPES = {
    GET_TIMEOFF: "GET_TIMEOFF",
    CREATE_TIMEOFF: "CREATE_TIMEOFF",
    TIMEOFF_CREATE_LOADING: "TIMEOFF_CREATE_LOADING",
    TIMEOFF_GET_LOADING: "TIMEOFF_GET_LOADING",
    TIMEOFF_UPDATE_LOADING: "TIMEOFF_UPDATE_LOADING",
    TIMEOFF_DELETE_LOADING: "TIMEOFF_DELETE_LOADING",
    UPDATE_STATUS: "UPDATE_STATUS",
    UPDATE_STATUS_REALTIME: "UPDATE_STATUS_REALTIME",
    DELETE_TIMEOFF: "DELETE_TIMEOFF",
    UPDATE_TIMEOFF_ADMIN: "UPDATE_TIMEOFF_ADMIN",
}

// create
export const timeOffCreate = (data: any, auth: any, timeoffState: SendTimeoffAPISendDataType, setData: (datas: SetStateAction<SendTimeoffAPISendDataType>) => void, setOpen: (open: boolean) => void, user: any, socket: any, timeoffsFetch: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        dispatch({ type: TIMEOFF_TYPES.TIMEOFF_CREATE_LOADING, payload: true })

        // get signup data    
        const res = await postData('timeoff/create', data, auth.token)

        if (res.data.success === true) {

            // react query to call the get api again
            timeoffsFetch();


            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })
            dispatch({
                type: TIMEOFF_TYPES.CREATE_TIMEOFF,
                payload: res.data.datas
            })

            socket.emit("createTimeoff", { ...res.data.datas })

            const notifyData = {
                recipients: [],
                isAdmin: true,
                url: '/dashboard/requests',
                // @ts-ignore
                content: `${user.firstName + ' ' + user.lastName} request for ${data.for}`
            }

            dispatch(createNotification(notifyData, auth.token, socket))

            setData(timeoffState);
            setOpen(false);
        } else {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'error', msg: res.data.message }
            })
        }

        dispatch({ type: TIMEOFF_TYPES.TIMEOFF_CREATE_LOADING, payload: false })

    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// get
export const timeOffGet = (token: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        dispatch({ type: TIMEOFF_TYPES.TIMEOFF_GET_LOADING, payload: true })

        // get signup data    
        const res = await getData('timeoff', token)

        if (res.data.success === true) {
            dispatch({
                type: TIMEOFF_TYPES.GET_TIMEOFF,
                payload: res.data.datas
            })
        }

        dispatch({ type: TIMEOFF_TYPES.TIMEOFF_GET_LOADING, payload: false })

    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// status update
export const timeOffStatusUpdate = (
    data: any,
    token: string,
    timeoffId: string,
    username: string,
    setOpen: (open: boolean) => void,
    socket: any,
    notifyData: any,
    timeoffsFetch: any,
    userFetch: any,
    timeoffsByIdFetch: any,
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        dispatch({ type: TIMEOFF_TYPES.TIMEOFF_UPDATE_LOADING, payload: true })

        // get signup data    
        const res = await patchData(`/timeoff/${timeoffId}/update`, data, token)

        if (res.data.success === true) {

            timeoffsFetch();
            userFetch();
            timeoffsByIdFetch();

            dispatch(createNotification(notifyData, token, socket))

            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })
            dispatch({
                type: TIMEOFF_TYPES.UPDATE_STATUS,
                payload: [{ ...res.data.updated, ...data, user: { username } }]
            })

            socket.emit('updateTimeOff', {
                recipients: notifyData.recipients,
                data: [{ ...res.data.updated, ...data, user: { username } }]
            })

            setOpen(false)
        } else {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'error', msg: res.data.message }
            })
        }

        dispatch({ type: TIMEOFF_TYPES.TIMEOFF_UPDATE_LOADING, payload: false })

    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// status update
export const timeOffDelete = (token: string, timeoffId: any, timeoffsFetch: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        dispatch({ type: TIMEOFF_TYPES.TIMEOFF_DELETE_LOADING, payload: true })

        // get signup data    
        const res = await deleteData(`/timeoff/${timeoffId}/delete`, token)

        if (res.data.success === true) {

            timeoffsFetch();

            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })
            dispatch({
                type: TIMEOFF_TYPES.DELETE_TIMEOFF,
                payload: timeoffId
            })
        } else {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'error', msg: res.data.message }
            })
        }

        dispatch({ type: TIMEOFF_TYPES.TIMEOFF_DELETE_LOADING, payload: false })

    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}



