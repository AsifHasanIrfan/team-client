import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAtom } from 'jotai';
import { io } from 'socket.io-client'

import { IRootState } from '@config/types';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { refreshToken } from '@redux/actions/auth';
import { landingPageLayoutUrls } from '@config/index';
import { authAtom, taskOptionAtom } from '@state/index';
import { getTasksData } from '@redux/actions/tasks';
import { getNotification } from '@redux/actions/notification';
import { GLOBAL_TYPES } from '@redux/actions/globalTypes';
import SocketClient from './socketClient';
import { wordCapitalize } from '@utils/wordCapitalize';

const GlobalAction = () => {
  const router = useRouter();
  const [changeAuth, setChangeAuth] = useAtom(authAtom);
  const [taskOptions, setTaskOptions] = useAtom(taskOptionAtom)

  const dispatch = useAppDispatch()
  const { global, auth, users, tasks } = useAppSelector((state: IRootState) => state)

  const { ALERT } = global

  useEffect(() => {
    if (ALERT.status) {
      if (ALERT.status == 'error') {
        toast.error(wordCapitalize(ALERT.msg))
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { status: '', msg: '' } });
      }

      else if (ALERT.status == 'success') {
        toast.success(wordCapitalize(ALERT.msg))
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: { status: '', msg: '' } });
      };
    }
  }, [ALERT]);

  useEffect(() => {
    let isCancelled = false
    const socket = io(`${process.env.mainServerUrl}`, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999
    })

    if (!isCancelled) {
      if (!auth.token) {
        dispatch(refreshToken())
      }

      dispatch({ type: GLOBAL_TYPES.SOCKET, payload: socket })
    }

    return () => {
      isCancelled = true;
      socket.close()
    };
  }, [dispatch])

  useEffect(() => {
    const isAuth = async () => {
      if (!landingPageLayoutUrls.includes(router.pathname)) {
        if (!global.refresh_token_loading) {
          if (!auth.token) {
            router.push("/")
          }

          if (auth.token) {
            if (auth.user.role == 'admin') {
              setChangeAuth({
                isAuthenticated: true,
                isAdmin: true,
              })

              if (tasks.all_tasks?.length == 0) {
                dispatch(getTasksData(auth.token))
              }

              if (taskOptions?.length < 5) {
                let AT = [
                  { value: 'Approved', label: 'Approved' },
                  { value: 'Assigned', label: 'Assigned' },
                  { value: 'In Progress', label: 'In Progress' },
                  { label: "In Revision", value: "In Revision" }
                ]
                setTaskOptions([...taskOptions, ...AT])
              }
            } else {
              setChangeAuth({
                isAuthenticated: false,
                isAdmin: false,
              })

              if (taskOptions?.length < 3) {
                setTaskOptions([
                  ...taskOptions,
                  { label: "Blocked", value: "Blocked" },
                  { value: 'Completed', label: 'Completed' },
                  { value: 'Late Task', label: 'Late Task' },
                ])
              }
            }
          }
        }
      }
    }
    isAuth()
  }, [router.pathname, auth.token, dispatch, global.refresh_token_loading])

  useEffect(() => {
    if (!landingPageLayoutUrls.includes(router.pathname)) {
      if (auth.token) {
        // if (users.all_users?.length == 0) {
        //   dispatch(getUsers(auth.token))
        // }

        dispatch(getNotification(auth.token))
      }
    }
  }, [auth.token])

  return (
    <div className='global__actions' >
      <Toaster
        containerStyle={{
          zIndex: 99999999999// For the container
        }}

        toastOptions={{
          style: {
            zIndex: 99999999999// For toasts
          },
        }}
      />

      {auth.token && <SocketClient />}
    </div>
  )
}

export default GlobalAction;
