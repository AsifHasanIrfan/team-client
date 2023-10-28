import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@hooks/useRedux"

import { NOTIFICATION_TYPES } from "@redux/actions/notification"
import { TASKS_TYPE } from "@redux/actions/tasks"
import { TIMEOFF_TYPES } from "@redux/actions/timeoff"
import { USERS_TYPE } from "@redux/actions/users"
import { GLOBAL_TYPES } from "@redux/actions/globalTypes"

const DOMAIN = 'https://dgteam.vercel.app/'

const spawnNotification = (body: string, url: any, title: any) => {
    let options = {
        body
    }
    let n = new Notification(title, options)

    n.onclick = e => {
        e.preventDefault()
        window.open(url, '_blank')
    }
}

const SocketClient = () => {
    const { auth, socket, notification, online } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const audioRef = useRef<any>()

    // joinUser
    useEffect(() => {
        socket.emit('joinUser', auth.user)
    }, [socket, auth.user])

    // Notification
    useEffect(() => {
        socket.on('createNotifyToClient', (msg: any) => {
            dispatch({ type: NOTIFICATION_TYPES.CREATE_NOTIFY, payload: msg })

            audioRef.current.play()
            spawnNotification(
                msg.content,
                DOMAIN + msg.url,
                'DG TEAM'
            )
        })

        return () => socket.off('createNotifyToClient')
    }, [socket, dispatch, notification.sound])

    useEffect(() => {
        socket.on('removeNotifyToClient', (msg: any) => {
            dispatch({ type: NOTIFICATION_TYPES.REMOVE_NOTIFY, payload: msg })
        })

        return () => socket.off('removeNotifyToClient')
    }, [socket, dispatch])

    // Task
    useEffect(() => {
        socket.on('createTaskToClient', (task: any) => {
            dispatch({ type: TASKS_TYPE.UPDATE_TASK, payload: task })
        })

        return () => socket.off('createTaskToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('updateTaskToClient', (newTask: any) => {
            dispatch({ type: TASKS_TYPE.UPDATE_STATUS, payload: newTask })
        })

        return () => socket.off('updateTaskToClient')
    }, [socket, dispatch])

    // timeOff
    useEffect(() => {
        socket.on('createTimeoffToClient', (newTimeoff: any) => {
            dispatch({
                type: TIMEOFF_TYPES.UPDATE_TIMEOFF_ADMIN,
                payload: newTimeoff
            })
        })

        return () => socket.off('createTimeoffToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('updateTimeOffToClient', (newTimeoff: any) => {
            dispatch({
                type: TIMEOFF_TYPES.UPDATE_STATUS_REALTIME,
                payload: newTimeoff
            })
        })

        return () => socket.off('updateTimeOffToClient')
    }, [socket, dispatch])


    // user
    useEffect(() => {
        socket.on('userUpdateReqToClient', (reqData: any) => {
            if (auth.user.updateRequest.length !== 0) {
                dispatch({
                    type: USERS_TYPE.UPDATE_REQUEST,
                    payload: reqData
                })
            }
        })

        return () => socket.off('userUpdateReqToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('approveRequestToClient', (approvedData: any) => {
            dispatch({
                type: USERS_TYPE.UPDATE_DATA,
                payload: approvedData
            })
        })

        return () => socket.off('approveRequestToClient')
    }, [socket, dispatch])



    // online/offline user
    useEffect(() => {
        if (!online.includes(auth.user._id)) {
            socket.emit('onlineUser', auth.user)
        }
    }, [socket, auth.user])

    useEffect(() => {
        socket.on('checkUserOnlineToClient', (id: any) => {
            if (!online.includes(id)) {
                dispatch({ type: GLOBAL_TYPES.ONLINE_USER, payload: id })
            }
        })

        return () => socket.off('checkUserOnlineToClient')
    }, [socket, dispatch, online])

    useEffect(() => {
        socket.on('checkUserOnlineToMe', (data: any) => {
            data.forEach((item: any) => {
                if (!online.includes(item.id)) {
                    dispatch({ type: GLOBAL_TYPES.ONLINE_USER, payload: item.id })
                }
            })
        })

        return () => socket.off('checkUserOnlineToMe')
    }, [socket, dispatch, online])


    // Check User Offline
    useEffect(() => {
        socket.on('CheckUserOffline', (id: any) => {
            dispatch({ type: GLOBAL_TYPES.OFFLINE_USER, payload: id })
        })

        return () => socket.off('CheckUserOffline')
    }, [socket, dispatch])


    return (
        <>
            <audio controls ref={audioRef} style={{ display: 'none' }} >
                <source src='/audio/notification-sound.mp3' type="audio/mp3" />
            </audio>
        </>
    )
}

export default SocketClient