// internal imports
import { deleteData, getData, patchData, postData } from "@utils/fetchData"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { GLOBAL_TYPES } from "./globalTypes"

// Notification type
export const NOTIFICATION_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    UNREAD_ALL_NOTIFIES: 'UNREAD_ALL_NOTIFIES',
    ARCHIVE_ALL_NOTIFIES: 'ARCHIVE_ALL_NOTIFIES',
    GET_NOTIFICATION_LOADING: 'GET_NOTIFICATION_LOADING',
}


// create notification
export const createNotification = (data: any, token: any, socket: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        const res = await postData('notification/create', data, token)

        socket.emit('createNotify', {
            ...res.data.notification,
        })
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}


// get notification
export const getNotification = (token: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.GET_NOTIFICATION_LOADING, payload: true })

        const res = await getData('notification', token)
        dispatch({ type: NOTIFICATION_TYPES.GET_NOTIFIES, payload: res.data.notification })

        dispatch({ type: NOTIFICATION_TYPES.GET_NOTIFICATION_LOADING, payload: false })
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// archive notification
export const archiveNotification = (data: any, auth: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        const res = await patchData(`notification/archive/${data._id}`, null, auth.token)

        if (res.data.success === true) {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })
            const notArchiveData = await getData('notification', auth.token);
            dispatch({ type: NOTIFICATION_TYPES.UPDATE_NOTIFY, payload: { data: notArchiveData.data.notification } })
        }
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}


// is read notification
export const isReadNotification = (data: any, auth: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        const res = await patchData(`notification/isRead/${data._id}`, null, auth.token)

        if (res.data.success === true) {
          const updateNotificationData = await getData(
            'notification',
            auth.token
          );
            dispatch({
              type: NOTIFICATION_TYPES.UPDATE_NOTIFY,
              payload: {
                data: updateNotificationData.data.notification,
              },
            });
        }
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}


// is read modal notification
export const isReadModalNotification = (data: any, auth: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        const res = await patchData(`notification/isRead/${data._id}`, null, auth.token)

        if (res.data.success === true) {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })
            const updateNotificationData = await getData(
              'notification',
              auth.token
            );
            
            dispatch({
              type: NOTIFICATION_TYPES.UPDATE_NOTIFY,
              payload: {
                data: updateNotificationData.data.notification,
              },
            });
        }
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}


// unread notification
export const unreadNotification = (data: any, auth: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        const res = await patchData(`notification/unread/${data._id}`, null, auth.token)

        if (res.data.success === true) {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })
            
            const readData = await getData(
              'notification',
              auth.token
            );
            dispatch({
              type: NOTIFICATION_TYPES.UPDATE_NOTIFY,
              payload: { data: readData.data.notification },
            });
        }
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// unread all notification
export const unreadAllNotification = (auth: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        const res = await patchData('notification/unreadAll', null, auth.token)

        if (res.data.success === true) {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })

            dispatch({ type: NOTIFICATION_TYPES.UNREAD_ALL_NOTIFIES, payload: false })
        }
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// read all notification
export const readAllNotification = (auth: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        const res = await patchData('notification/readAll', null, auth.token)

        if (res.data.success === true) {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })

            dispatch({ type: NOTIFICATION_TYPES.UNREAD_ALL_NOTIFIES, payload: true })
        }
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// archive all notification
export const archiveAllNotification = (auth: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        const res = await patchData('notification/archiveAll', null, auth.token)

        if (res.data.success === true) {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })

            dispatch({ type: NOTIFICATION_TYPES.ARCHIVE_ALL_NOTIFIES, payload: true })
        }
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}