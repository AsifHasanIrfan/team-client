import { authAtom } from '@state/index';
import { getData, patchData, postData, putData } from '@utils/fetchData';
import { uploadFiles } from '@utils/uploadFile';
import axios from 'axios';
import { useAtom } from 'jotai';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GLOBAL_TYPES } from './globalTypes';
import { createNotification } from './notification';

export const USERS_TYPE = {
  GET_USERS: 'GET_USERS',
  GET_SINGLE_USERS: 'GET_SINGLE_USERS',
  USER_GET_LOADING: 'USER_GET_LOADING',
  UPDATE_USER_BIO_LOADING: 'UPDATE_USER_BIO_LOADING',
  UPDATE_BIO: 'UPDATE_BIO',
  UPDATE_DATA_LOADING: 'UPDATE_DATA_LOADING',
  UPDATE_PASS_LOADING: 'UPDATE_PASS_LOADING',
  UPDATE_DATA: 'UPDATE_DATA',
  UPDATE_DATA_TEAM: 'UPDATE_DATA_TEAM',
  UPDATE_APPROVE_LOADING: 'UPDATE_APPROVE_LOADING',
  UPDATE_DECLINE_LOADING: 'UPDATE_DECLINE_LOADING',
  UPDATE_APPROVE: 'UPDATE_APPROVE',
  UPDATE_REQUEST: 'UPDATE_REQUEST',
};

// get all users
// export const getUsers =
//   (token: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
//     try {
//       const res = await getData('users', token);

//       if (res.data.success === true) {
//         dispatch({
//           type: USERS_TYPE.GET_USERS,
//           payload: res.data.users,
//         });
//       }
//     } catch (e) {
//       dispatch({
//         type: GLOBAL_TYPES.ALERT,
//         payload: { status: 'error', msg: (e as Error).message },
//       });
//     }
//   };

// get all user
export const getUser =
  (token: string, userId: string) =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      try {
        dispatch({ type: USERS_TYPE.USER_GET_LOADING, payload: true });

        const res = await getData(`user/${userId}`, token);

        if (res.data.success === true) {
          dispatch({
            type: USERS_TYPE.GET_SINGLE_USERS,
            payload: res.data.user,
          });
        }

        dispatch({ type: USERS_TYPE.USER_GET_LOADING, payload: false });
      } catch (e) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'error', msg: (e as Error).message },
        });
      }
    };

// user bio update
export const userBioUpdate =
  (data: any, token: string, userId: string) =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      try {
        dispatch({ type: USERS_TYPE.UPDATE_USER_BIO_LOADING, payload: true });

        // get signup data
        const res = await patchData(`/user/${userId}/update-bio`, data, token);

        if (res.data.success === true) {
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'success', msg: res.data.message },
          });
          dispatch({
            type: USERS_TYPE.UPDATE_BIO,
            payload: data.bio,
          });
        } else {
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: res.data.message },
          });
        }

        dispatch({ type: USERS_TYPE.UPDATE_USER_BIO_LOADING, payload: false });
      } catch (e) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'error', msg: (e as Error).message },
        });
      }
    };

// update user data
export const updateUserData = (data: any, imgSrc: string, auth: any, userId: string, socket: any) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    let avatar = imgSrc;

    try {

      if (data?.password) {
        dispatch({ type: USERS_TYPE.UPDATE_PASS_LOADING, payload: true });
      } else {
        dispatch({ type: USERS_TYPE.UPDATE_DATA_LOADING, payload: true });
      }

      if (data.avatar?.length > 0) {
        const res = await uploadFiles(data.avatar);
        avatar = res[0].url;
      }

      let sendPayload = { ...data };
      // console.log(sendPayload);
      if (!data?.password) {
        sendPayload.avatar = avatar;
      }

      const res = await putData(
        `user/update-user/${userId}`,
        { ...sendPayload },
        auth.token
      );

      if (res.data.success === true) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'success', msg: res.data.message },
        });

        if (auth.user.role === 'admin') {
          dispatch({
            type: USERS_TYPE.UPDATE_DATA,
            payload: { ...sendPayload },
          });
        } else {
          socket.emit('userUpdateReq', res.data.updated);
        }

        const notifyData = {
          recipients: [],
          isAdmin: true,
          url: '/dashboard/requests?for=1',
          // @ts-ignore
          content: `${auth.user.firstName + ' ' + auth.user.lastName
            } request for change account information`,
        };

        dispatch(createNotification(notifyData, auth.token, socket));
      } else {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'error', msg: res.data.message }
        });
      }

      if (data?.password) {
        dispatch({ type: USERS_TYPE.UPDATE_PASS_LOADING, payload: false });
      } else {
        dispatch({ type: USERS_TYPE.UPDATE_DATA_LOADING, payload: false });
      }
    } catch (e) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'error', msg: (e as Error).message },
      });
    }
  };

// update user information data
export const updateUserInfoData =
  (data: any, imgSrc: string, token: string, userId: string) =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      let avatar = imgSrc;

      try {
        dispatch({ type: USERS_TYPE.UPDATE_DATA_LOADING, payload: true });

        if (data.avatar?.length > 0) {
          const res = await uploadFiles(data.avatar);
          avatar = res[0].url;
        }

        let sendPayload = { ...data };
        if (!data?.password) {
          sendPayload.avatar = avatar;
        }

        const res = await putData(
          `user/update-user/${userId}`,
          { ...sendPayload },
          token
        );

        if (res.data.success === true) {
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'success', msg: res.data.message },
          });
        } else {
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { ...sendPayload },
          });
        }

        dispatch({ type: USERS_TYPE.UPDATE_DATA_LOADING, payload: false });
      } catch (e) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'error', msg: (e as Error).message },
        });
      }
    };

export const updateUserProfile =
  (data: any, imgSrc: string, token: string, userId: string) =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      let avatar = imgSrc;

      try {
        dispatch({ type: USERS_TYPE.UPDATE_DATA_LOADING, payload: true });

        if (data.avatar?.length > 0) {
          const res = await uploadFiles(data.avatar);
          avatar = res[0].url;
        }

        let sendPayload = { ...data };

        if (data.avatar.length > 0) {
          sendPayload.avatar = avatar;
        }

        const res = await patchData(
          `user/update-profile-photo/${userId}`,
          { ...sendPayload },
          token
        );

        if (res.data.success === true) {
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'success', msg: res.data.message },
          });
        } else {
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { ...sendPayload },
          });
        }

        dispatch({ type: USERS_TYPE.UPDATE_DATA_LOADING, payload: false });
      } catch (e) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'error', msg: (e as Error).message },
        });
      }
    };

// approve request
export const approveRequest =
  (auth: any, userId: any, reqId: string, setOpen: any, socket: any) =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      try {
        dispatch({ type: USERS_TYPE.UPDATE_APPROVE_LOADING, payload: true });

        const res = await putData(
          `user/update-approve/${reqId}`,
          { action: 'approved' },
          auth.token
        );

        if (res.data.success === true) {
          dispatch({
            type: USERS_TYPE.GET_USERS,
            payload: res.data.users,
          });

          dispatch({
            type: USERS_TYPE.UPDATE_APPROVE,
            payload: res.data.id,
          });

          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'success', msg: res.data.message },
          });

          socket.emit('approveRequest', {
            recipients: [userId],
            data: res.data.updated,
          });

          const notifyData = {
            recipients: [userId],
            url: '/dashboard/profile',
            // @ts-ignore
            content: `Admin approved your information update request`,
          };

          dispatch(createNotification(notifyData, auth.token, socket));

          setOpen(false);
        } else {
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: res.data.message },
          });
        }

        dispatch({ type: USERS_TYPE.UPDATE_APPROVE_LOADING, payload: false });
      } catch (e) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'error', msg: (e as Error).message },
        });
      }
    };

// decline request
export const declineRequest =
  (token: string, reqId: string, setOpen: any, socket: any) =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      try {
        dispatch({ type: USERS_TYPE.UPDATE_DECLINE_LOADING, payload: true });

        const res = await putData(
          `user/update-approve/${reqId}`,
          { action: 'declined' },
          token
        );

        if (res.data.success === true) {
          dispatch({
            type: USERS_TYPE.UPDATE_APPROVE,
            payload: res.data.id,
          });

          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'success', msg: res.data.message },
          });

          setOpen(false);
        } else {
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { status: 'error', msg: res.data.message },
          });
        }

        dispatch({ type: USERS_TYPE.UPDATE_DECLINE_LOADING, payload: false });
      } catch (e) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { status: 'error', msg: (e as Error).message },
        });
      }
    };
