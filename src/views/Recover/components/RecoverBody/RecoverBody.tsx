import CircularProgress from '@components/CircularProgress';
import { useAppSelector, useAppDispatch } from '@hooks/useRedux';
import { createNotification } from '@redux/actions/notification';
import axios from 'axios';
import { Field, Formik, Form } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { io } from 'socket.io-client'

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required'),
});

type Props = {
  setShowSuccess: (showSuccess: boolean) => void
}

const RecoverBody = ({ setShowSuccess }: Props) => {

  // global states
  const dispatch = useAppDispatch()

  // states
  const [loading, setLoading] = useState(false);

  const socket = io(`${process.env.mainServerUrl}`)

  useEffect(() => {
    socket.emit('joinUser', { _id: "need__password" })
  }, [socket])

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={RecoverSchema}
      onSubmit={(values) => {
        setLoading(true);
        axios.post(`${process.env.serverUrl}forget-password`, values)
          .then(response => {
            setLoading(false);
            if (response.data.success === false) {
              setShowSuccess(false);
              return toast.error(response.data.message);
            }
            if (response.data.success === true) {
              setShowSuccess(true);
              toast.success(response.data.message);

              // send notification 
              const notifyData = {
                recipients: [],
                isAdmin: true,
                url: '/dashboard/requests?tab=forgotPassword',
                // @ts-ignore
                content: `Someone request for password`
              }

              dispatch(createNotification(notifyData, '', socket))
            }
          });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="rounded-lg flex flex-col md:ml-auto w- mt-5 2xl:mt-[50px] lg:mt-[30px] ">
            <div className=" mb-5">
              <div className="mb-3">
                <label htmlFor="full-name" className="leading-7 text-2xl ">
                  Email
                </label>
              </div>
              <Field
                placeholder="digitalgrgg@gmail.com"
                type="email"
                id="email"
                name="email"
                className={`w-full text-base bg-white rounded border border-[#dddddd] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-700  py-4 px-5 leading-8 transition-colors duration-200 ease-in-out ${errors.email && touched.email && 'border border-[red]'}`}
              />
              {(errors.email && touched.email) && (
                <div className="ml-1.5 mt-1.5 text-[red]">
                  {errors.email}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`text-white bg-secondary relative border-0 py-5 px-8 focus:outline-none rounded text-base hover:bg-primary ${loading && 'bg-primary flex justify-center items-center'}`}
              disabled={loading}
            >
              {loading ?
                <><CircularProgress size={22} /> <span className='ml-2'>Sending</span></>
                : 'Send'}
            </button>

            <div className="mt-[30px]">
              <p>
                Have an accountt?{' '}
                <Link href="/login">
                  <span className="text-primary hover:text-red cursor-pointer">Sign in</span>
                </Link>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RecoverBody;
