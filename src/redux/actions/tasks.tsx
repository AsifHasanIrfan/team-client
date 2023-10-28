import { getData, postData, putData } from "@utils/fetchData"
import { uploadFiles } from "@utils/uploadFile"
import DgCoin from "@views/UserProfile/components/UserCardsInfo/DgCoin/DgCoin"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { GLOBAL_TYPES } from "./globalTypes"
import { createNotification } from './notification'

export const TASKS_TYPE = {
    GET_TASKS: "GET_TASKS",
    CREATE_TASK: "CREATE_TASK",
    UPDATE_TASK: "UPDATE_TASK",
    UPDATE_STATUS: "UPDATE_STATUS",
    CREATE_TASK_LOADING: "CREATE_TASK_LOADING",
    UPDATE_TASK_LOADING: "UPDATE_TASK_LOADING",
    GET_TASKS_LOADING: "GET_TASKS_LOADING",
}


// create tasks
export const createTask = (data: Object, files: Array<File>, userId: string, token: string, resetForm: any, socket: any, setOpen: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    let attachments: any = []

    try {
        dispatch({ type: TASKS_TYPE.CREATE_TASK_LOADING, payload: true })

        if (files.length > 0) {
            attachments = await uploadFiles(files)
        }

        const res = await postData(`task/create-task/${userId}`, { ...data, attachments }, token)

        if (res.data.success === true) {
            setOpen(false)
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'success', msg: res.data.message }
            })

            dispatch({
                type: TASKS_TYPE.UPDATE_TASK,
                payload: { ...res.data.task }
            })

            //send data to socket server
            socket.emit(
                'createTask',
                {
                    recipients: [userId],
                    data: { ...res.data.task }
                }
            )

            let notifyData = {
                recipients: [userId],
                url: '/dashboard/tasks',
                // @ts-ignore
                content: `New Task : ${data.title}`
            }

            dispatch(createNotification(notifyData, token, socket))

            resetForm({
                title: '',
                description: '',
                dgCoin: 0,
                dueTime: ''
            })
        } else {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: { status: 'error', msg: res.data.message }
            })
        }

        dispatch({ type: TASKS_TYPE.CREATE_TASK_LOADING, payload: false })
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// get all tasks
export const getTasksData = (token: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
        dispatch({ type: TASKS_TYPE.GET_TASKS_LOADING, payload: true })

        const res = await getData('task/get-task', token)

        if (res.data.success === true) {
            dispatch({
                type: TASKS_TYPE.GET_TASKS,
                payload: res.data.tasks
            })
        }

        dispatch({ type: TASKS_TYPE.GET_TASKS_LOADING, payload: false })
    } catch (e) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: (e as Error).message }
        })
    }
}

// update task
export const updateTasksData =
  (
    status: string,
    rDesc: string,
    bDesc: string,
    lDesc: string,
    token: string,
    user: any,
    worker: any,
    taskId: string,
    role: string,
    setOpen: (open: boolean) => void,
    socket: any,
    percentDgCoin: any
  ) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const taskApi =
        role !== 'admin'
          ? `task/update-task-status/${taskId}`
          : `task/update-task-admin/${taskId}`;

      dispatch({ type: TASKS_TYPE.UPDATE_TASK_LOADING, payload: true });

      const res = await putData(
        taskApi,
        {
          status,
          percentDgCoin,
          revision_description: rDesc,
          blocked_description: bDesc,
          latetask_description: lDesc,
          submissionDate: new Date().toISOString(),
        },
        token
      );

      if (res.data.success === true) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'success', msg: res.data.message },
        });
        dispatch({
          type: TASKS_TYPE.UPDATE_STATUS,
          payload: [
            {
              ...res.data.updated,
              status,
              revision_description: rDesc,
              blocked_description: bDesc,
              latetask_description: lDesc
            },
          ],
        });

        // send status to socket server
        socket.emit('updateTask', {
          recipients: user.role === 'admin' ? [worker._id] : [],
          isAdmin: user.role === 'admin' ? false : true,
          data: [{ ...res.data.updated, status, revision_description: rDesc, submissionDate: new Date()}],
        });

        let notifyData = {
          recipients: user.role === 'admin' ? [worker._id] : [],
          isAdmin: user.role === 'admin' ? false : true,
          url: '/dashboard/tasks',
          // @ts-ignore
          content:
            user.role === 'admin'
              ? `Admin update your task as ${status}`
              : `${
                  worker.firstName + ' ' + worker.lastName
                } Update his Task as ${status}`,
        };

        dispatch(createNotification(notifyData, token, socket));

        setOpen(false);
      } else {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'error', msg: res.data.message },
        });
      }

      dispatch({ type: TASKS_TYPE.UPDATE_TASK_LOADING, payload: false });
    } catch (e) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'error', msg: (e as Error).message },
      });
    }
  };

// update task
export const adminUpdateTask =
  (
    value: any,
    status: string,
    token: string,
    user: any,
    worker: any,
    taskId: string,
    setOpen: (open: boolean) => void,
    socket: any,
    percentDgCoin: any,
    isoDateString: any,
    dgCoin: any
  ) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({ type: TASKS_TYPE.UPDATE_TASK_LOADING, payload: true });

      const res = await putData(
        `task/update-task-admin/${taskId}`,
        {
          title: value.taskTitle,
          description: value.taskDescription,
          revision_description: value.inRevisionDescription,
          dueDateAndTime: isoDateString,
          status,
          percentDgCoin,
          dgCoin,
        },
        token
      );

      if (res.data.success === true) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'success', msg: res.data.message },
        });
        dispatch({
          type: TASKS_TYPE.UPDATE_STATUS,
          payload: [
            {
              ...res.data.updated,
              status,
              revision_description: value.inRevisionDescription,
            },
          ],
        });

        // send status to socket server
        socket.emit('updateTask', {
          recipients: user.role === 'admin' ? [worker._id] : [],
          isAdmin: user.role === 'admin' ? false : true,
          data: [
            {
              ...res.data.updated,
              status,
              revision_description: value.inRevisionDescription,
              submissionDate: new Date(),
            },
          ],
        });

        let notifyData = {
          recipients: user.role === 'admin' ? [worker._id] : [],
          isAdmin: user.role === 'admin' ? false : true,
          url: '/dashboard/tasks',
          // @ts-ignore
          content: `Admin update your task as ${status}`,
        };

        dispatch(createNotification(notifyData, token, socket));

        setOpen(false);
      } else {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'error', msg: res.data.message },
        });
      }

      dispatch({ type: TASKS_TYPE.UPDATE_TASK_LOADING, payload: false });
    } catch (e) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'error', msg: (e as Error).message },
      });
    }
  };