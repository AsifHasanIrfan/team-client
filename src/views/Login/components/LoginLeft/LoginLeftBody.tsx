// external import
import Link from 'next/link';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// internal import
import { cx } from '@config/constants';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { signin } from '@redux/actions/auth';
import CircularProgress from '@components/CircularProgress';
import EyeOff from '@components/Icons/Actions/EyeOff';
import Eye from '@components/Icons/Actions/Eye';
import { useRouter } from 'next/router';

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  remembar: Yup.boolean()
});

const LoginLeftBody: React.FC = () => {

  // global states
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { global } = useAppSelector(state => state)

  // states
  const [showPassword, setShowPassword] = useState<string>('password');
  const [isRememberChecked, setisRememberChecked] = useState(true);
  const [eyeHover, SetEyeHover] = useState('#34495e');
  const [eyeOffHover, SetEyeOffHover] = useState('#34495e');

  // changing checkbox default
  const handleChangeRemember = () => {
    setisRememberChecked(current => !current);
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        remembar: false
      }}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        values.username = values.username.replace(/\s+/g, '');
        dispatch(signin(values))
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="rounded-lg flex flex-col md:ml-auto mt-5 md:mt-0 ">
            <div className=" mb-5">
              <div className="mb-3">
                <label htmlFor="full-name" className="leading-7 text-2xl ">
                  Username
                </label>
              </div>
              <Field
                placeholder="Username"
                type="text"
                id="username"
                name="username"
                className={cx(
                  errors.username && touched.username && 'border border-[red]',
                  'w-full text-base bg-white rounded border border-[#dddddd]  outline-none text-gray-700  py-4 px-5 leading-8 transition-colors duration-200 ease-in-out'
                )}
              />
              {errors.username && touched.username ? (
                <div className="ml-1.5 mt-1.5 text-[red]">
                  {errors.username}
                </div>
              ) : null}
            </div>
            <div className="relative mb-5">
              <div className="mb-3 ">
                <label htmlFor="password" className="leading-7 text-2xl w-full">
                  Password
                </label>
              </div>
              <Field
                placeholder="Password"
                type={showPassword}
                id="password"
                name="password"
                className={cx(
                  errors.password && touched.password && 'border border-[red]',
                  'w-full text-base bg-white rounded border border-[#dddddd]  outline-none text-gray-700  py-4 px-5 leading-8 transition-colors duration-200 ease-in-out'
                )}
              />
              <div
                className="absolute right-[20px] top-[65px] cursor-pointer"
                onClick={() =>
                  setShowPassword(
                    showPassword === 'password' ? 'text' : 'password'
                  )
                }
              >
                {showPassword === 'password' ? <div
                  onMouseOver={() => SetEyeOffHover('black')}
                  onMouseLeave={() => SetEyeOffHover('#34495e')}>
                  <EyeOff hoverColor={eyeOffHover} />
                </div>
                  : <div
                    onMouseOver={() => SetEyeHover('black')}
                    onMouseLeave={() => SetEyeHover('#34495e')}>
                    <Eye hoverColor={eyeHover} />
                  </div>}
              </div>
              {errors.password && touched.password ? (
                <div className="ml-1.5 mt-1.5 text-[red]">
                  {errors.password}
                </div>
              ) : null}
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="custom-checkbox" role='button'>
                <label className="login-checkbox block relative top-[2px] pl-[30px] mb-[0px] cursor-pointer text-[15px]">
                  <span className="relative top-[-2px] hover:text-red">
                    Remember Me
                  </span>
                  <Field
                    type="checkbox"
                    name="remembar"
                    // defaultChecked={true}
                    checked={isRememberChecked}
                    onChange={handleChangeRemember}
                    className="absolute opacity-[0] cursor-pointer h-0 w-0"
                  />
                  <span className="checkmark absolute top-0 left-0 h-[18px] w-[18px] bg-[#FFF] border border-[#ccc] after:content-[''] after:absolute after:hidden after:left-[6px] after:top-[3px] after:w-[5px] after:h-[8px] after:border-[#FFF] after:border-[0_3px_3px_0]"></span>
                </label>
              </div>

              <Link href="/recover" passHref>
                <a className="text-primary hover:text-red text-[15px]">
                  Recover password
                </a>
              </Link>
            </div>
            <button
              type="submit"
              className={`text-white bg-secondary relative border-0 py-5 px-8 focus:outline-none rounded text-base hover:bg-primary transition ease-in-out duration-300 ${global.signin_loading && 'bg-primary flex justify-center items-center'}`}
              disabled={global.signin_loading}
            >
              {global.signin_loading ?
                <><CircularProgress size={22} /> <span className='ml-2'>Signing In</span></>
                : 'Login to Your Account'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/login-request')}
              className={`text-white bg-secondary relative border-0 py-5 px-8 focus:outline-none rounded text-base mt-4 hover:bg-primary transition ease-in-out duration-300`}
            >
              Request Login Details
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default LoginLeftBody;
