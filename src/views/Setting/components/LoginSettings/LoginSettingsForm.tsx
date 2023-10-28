import React, { useEffect, useState } from 'react';

// custom components
import { cx } from '@config/constants';
import Input from '@views/Setting/Input';
import Button from '@components/Button';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { updateUserData } from '@redux/actions/users';
import { GLOBAL_TYPES } from '@redux/actions/globalTypes';
import { useAuth } from '@state/index';
import EyeOff from '@components/Icons/Actions/EyeOff';
import Eye from '@components/Icons/Actions/Eye';

const LoginSettingsForm: React.FC = () => {
  const { isAdmin } = useAuth()

  const { auth, users, socket } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  const [isDisable, setIsDisable] = useState(true)

  const [showPassword, setShowPassword] = useState<string>('password');
  const [showOldPassword, setShowOldPassword] = useState<string>('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState<string>('password');

  const [eyeHoverOldPassword, SetEyeHoverOldPassword] = useState('#34495e');
  const [eyeOffHoverOldPassword, SetEyeOffHoverOldPassword] = useState('#34495e');
  const [eyeHoverPassword, SetEyeHoverPassword] = useState('#34495e');
  const [eyeOffHoverPassword, SetEyeOffHoverPassword] = useState('#34495e');
  const [eyeHoverConfirmPassword, SetEyeHoverConfirmPassword] = useState('#34495e');
  const [eyeOffHoverConfirmPassword, SetEyeOffHoverConfirmPassword] = useState('#34495e');

  const [input, setInput] = useState({
    password: '',
    cpassword: '',
    opassword: '',
  });

  // onsubmit
  let onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.password !== input.cpassword) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'error', msg: 'Password not match' }
      })
    } else if (input.password?.length < 6) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { status: 'error', msg: 'password minimum 6 characters' }
      })
    } else if (input.password === input.cpassword) {
      dispatch(updateUserData({ password: input.password, old_password: input.opassword }, '', auth, auth.user._id, socket))
    }
  };

  // onchange handler
  let onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (input.cpassword.length < 6) {
      setIsDisable(true)
    } else if (input.password.length < 6) {
      setIsDisable(true)
    } else if (input.opassword.length < 6) {
      setIsDisable(true)
    } else {
      setIsDisable(false)
    }
  }, [input])

  return (
    <form onSubmit={onSubmit} className={cx('', 'w-full flex flex-col')}>

      <div className="flex flex-col lg:flex-row w-full gap-x-[20px]">

        {/* confirm new password */}
        <div className='relative w-full'>
          <Input
            label="Old password"
            placeholder="Old password"
            type={showOldPassword}
            name="opassword"
            required
            onChange={onChange}
          />
          <div className='absolute right-[22px] top-[51px] cursor-pointer'
            onClick={() => setShowOldPassword(showOldPassword === 'password' ? 'text' : 'password')}
          >
            {showOldPassword === 'password' ? <div
              onMouseOver={() => SetEyeOffHoverOldPassword('black')}
              onMouseLeave={() => SetEyeOffHoverOldPassword('#34495e')}>
              <EyeOff hoverColor={eyeOffHoverOldPassword} />
            </div> : <div
              onMouseOver={() => SetEyeHoverOldPassword('black')}
              onMouseLeave={() => SetEyeHoverOldPassword('#34495e')}>
              <Eye hoverColor={eyeHoverOldPassword} />
            </div>}
          </div>
        </div>


        {/* new password */}
        <div className='relative w-full'>
          <Input
            label="New password"
            placeholder="New password"
            type={showPassword}
            name="password"
            required
            onChange={onChange}
          />
          <div className='absolute right-[22px] top-[51px] cursor-pointer'
            onClick={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}
          >
            {showPassword === 'password' ? <div
              onMouseOver={() => SetEyeOffHoverPassword('black')}
              onMouseLeave={() => SetEyeOffHoverPassword('#34495e')}>
              <EyeOff hoverColor={eyeOffHoverPassword} />
            </div> : <div
              onMouseOver={() => SetEyeHoverPassword('black')}
              onMouseLeave={() => SetEyeHoverPassword('#34495e')}>
              <Eye hoverColor={eyeHoverPassword} />
            </div>}
          </div>
        </div>


        {/* confirm new password */}
        <div className='relative w-full'>
          <Input
            label="Confirm new password"
            placeholder="Confirm new password"
            type={showConfirmPassword}
            name="cpassword"
            required
            onChange={onChange}
          />
          <div className='absolute right-[22px] top-[51px] cursor-pointer'
            onClick={() => setShowConfirmPassword(showConfirmPassword === 'password' ? 'text' : 'password')}
          >
            {showConfirmPassword === 'password' ? <div
              onMouseOver={() => SetEyeOffHoverConfirmPassword('black')}
              onMouseLeave={() => SetEyeOffHoverConfirmPassword('#34495e')}>
              <EyeOff hoverColor={eyeOffHoverConfirmPassword} />
            </div> : <div
              onMouseOver={() => SetEyeHoverConfirmPassword('black')}
              onMouseLeave={() => SetEyeHoverConfirmPassword('#34495e')}>
              <Eye hoverColor={eyeHoverConfirmPassword} />
            </div>}
          </div>
        </div>

      </div>

      {/* button */}
      <div className={cx('w-full md:w-[200px]', 'md:self-end', 'mt-2')}>
        <Button className="!w-full md:px-[15px]" loading={users.update_pass_loading} loadingText={isAdmin ? 'Updating' : 'Requesting'} rounded="md" disabled={isDisable} >
          {isAdmin ? 'Update password' : 'Request password'}
        </Button>
      </div>

    </form>
  );
};
export default LoginSettingsForm;
