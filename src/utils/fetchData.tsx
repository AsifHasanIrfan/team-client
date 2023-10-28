import axios from 'axios';
// import { fetchDataProps } from '@config/types'

// =================  GET DATA =================
export const getData = async (url?: string, token: string = '') => {
  const res = await axios.get(`${process.env.serverUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// ================= POST DATA =================
export const postData = async (
  url?: string,
  post?: any,
  token: string = ''
) => {
  const res = await axios.post(`${process.env.serverUrl}${url}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// ================= PUT DATA =================
export const putData = async (url?: string, post?: any, token: string = '') => {
  const res = await axios.put(`${process.env.serverUrl}${url}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// ================= PATCH DATA =================
export const patchData = async (
  url?: string,
  post?: any,
  token: string = ''
) => {
  const res = await axios.patch(`${process.env.serverUrl}${url}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// ================= DELETE DATA =================
export const deleteData = async (url?: string, token: string = '') => {
  const res = await axios.delete(`${process.env.serverUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// ==================== EDIT DATA ==================
export const EditData = (data: any, call: any) => {
  const newData = data.map(
    (item: any) => call.find((o: any) => o._id === item._id) || item
  );

  const WOcall = newData.filter((item: any) => {
    if (call.length > 0) {
      return call[0]._id !== item._id;
    }
  });

  const Wcall = newData.filter((item: any) => {
    if (call.length > 0) {
      return call[0]._id === item._id;
    }
  });

  return [...Wcall, ...WOcall];
};
