import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { BsArrowRightShort } from 'react-icons/bs';
import Button from '@components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import CircularProgress from '@components/CircularProgress';
import { io } from 'socket.io-client';
import { useAppDispatch } from '@hooks/useRedux';
import { createNotification } from '@redux/actions/notification';

type Props = {
  setShowSuccess: (showSuccess: boolean) => void;
}

const inputStyle =
  'border border-[#DADADA] focus:border-[#949494] outline-none rounded-lg bg-white px-5 py-3 placeholder:text-[#454545] w-full block';

const ContactSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
});

const MainForm = ({ setShowSuccess }: Props) => {

  // input number field
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const exceptThisSymbolsTag = ["<", ">", "^", "/"];

  // states
  const [loading, setLoading] = useState(false);

  // global states
  const dispatch = useAppDispatch()

  const socket = io(`${process.env.mainServerUrl}`)

  useEffect(() => {
    socket.emit('joinUser', { _id: "__contact" })
  }, [socket])

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        mobile: '',
        message: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, { resetForm }) => {
        setLoading(true);
        axios
          .post(`${process.env.serverUrl}contact`, values)
          .then((response) => {
            setLoading(false);
            if (response.data.success === false) {
              return toast.error(response.data.message);
            }
            if (response.data.success === true) {
              setShowSuccess(true);
              resetForm();
              toast.success(response.data.message);

              // use socket.io to send data & notification
              const notifyData = {
                recipients: [],
                isAdmin: true,
                url: '/dashboard/contact',
                // @ts-ignore
                content: `Got a message from someone`
              }

              dispatch(createNotification(notifyData, '', socket))
            }
          });
      }}
    >
      {({ errors, touched }) => (
        <Form className="mt-9">
          <div className="space-y-5">
            <Field
              type="text"
              placeholder="Your Name"
              name="name"
              onKeyDown={(e: any) => exceptThisSymbolsTag.includes(e.key) && e.preventDefault()}
              className={`${inputStyle} ${errors.name && touched.name && '!border-[red]'}`}
            />
            {errors.name && touched.name ? (
              <div className="!mt-[5px] text-[red] text-end">{errors.name}</div>
            ) : null}
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2.5 space-y-5 md:space-y-0">
              <div>
                <Field
                  type="email"
                  placeholder="Your Email"
                  className={`${inputStyle} ${errors.email && touched.email && '!border-[red]'}`}
                  onKeyDown={(e: any) => exceptThisSymbolsTag.includes(e.key) && e.preventDefault()}
                  name="email"
                />
                {errors.email && touched.email ? (
                  <div className="!mt-[5px] text-[red] text-end">
                    {errors.email}
                  </div>
                ) : null}
              </div>

              <Field
                type="number"
                placeholder="Your Phone"
                name="mobile"
                onKeyDown={(e: any) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                className={`${inputStyle} ${errors.email && touched.email && '!h-[51px]'}`}
              />
            </div>
            <Field
              as="textarea"
              className={`${inputStyle} resize-none ${errors.message && touched.message && '!border-[red]'
                }`}
              placeholder="Message"
              rows={5}
              name="message"
              onKeyDown={(e: any) => exceptThisSymbolsTag.includes(e.key) && e.preventDefault()}
            ></Field>
            {errors.message && touched.message ? (
              <div className="!mt-[5px] text-[red] text-end">
                {errors.message}
              </div>
            ) : null}
          </div>

          <Button
            type='submit'
            className="gap-1 mt-[30px] w-full lg:w-auto h-full"
            endIcon={!loading && <BsArrowRightShort size={28} />}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress size={28} />{' '}
                <span className="ml-2">Sending</span>
              </>
            ) : (
              'Send Request'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MainForm;