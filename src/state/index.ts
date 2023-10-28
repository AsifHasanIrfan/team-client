import { taskOptionType } from '@config/types';
import { atom, useAtom } from 'jotai';
import moment from 'moment';

export const applicationInfo = atom({
  lookingFor: '',
  job: 'designer',
  experience: '',
  skills: [],
  payGoal: '0',
  website: '',
  dribble: '',
  behance: '',
  uplabs: '',
  github: '',
  fullname: '',
  email: '',
  phone: '',
  location: '',
  city: '',
  state: '',
  zip: '',
});

export const internshipInfo = atom({
  lookingFor: '',
  job: 'designer',
  experience: '',
  skills: [],
  payGoal: '0',
  website: '',
  dribble: '',
  behance: '',
  uplabs: '',
  github: '',
  fullname: '',
  email: '',
  phone: '',
  location: '',
  city: '',
  state: '',
  zip: '',
});

export const yearNavAtom = atom(false);
export const dateObjectAtom = atom(moment());
export const monthTableAtom = atom(false);
export const selectedDateAtom = atom(moment());
export const calendarTableAtom = atom(true);

export const taskSearchValueAtom = atom('')
export const taskFilterValueAtom = atom('')
export const taskTitleValueAtom = atom('')
export const taskDescValueAtom = atom('')

export const userSearchValueAtom = atom('')
export const userFilterValueAtom = atom('')

export const yearsAtom = atom(
  Array.from({ length: 12 }, (v, i) => moment().year() + 12 - i - 1).reverse()
);

export const authAtom = atom({
  isAuthenticated: false,
  isAdmin: false,
});

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  return { ...auth, setAuth };
};

export const taskOptionAtom = atom<Array<taskOptionType>>([]);