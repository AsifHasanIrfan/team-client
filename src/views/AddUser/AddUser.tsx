import Button from '@components/Button';
import { addUserDesignationDatas, addUserWorkingAsDatas, cx } from '@config/constants';
import { addUserAPISendDataType } from '@config/types';
import Input from '@views/Setting/Input';
import React, { useId, useState } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { signup } from '@redux/actions/auth';
import EyeOff from '@components/Icons/Actions/EyeOff';
import Eye from '@components/Icons/Actions/Eye';

function AddUser() {

  // global variable from redux
  const dispatch = useAppDispatch();
  const { auth, global } = useAppSelector(state => state);

  // select designation object
  const [selectedOption, setSelectedOptions] = useState(addUserDesignationDatas[0]);
  const [selectedWorkingAsOption, setSelectedWorkingAsOptions] = useState(addUserWorkingAsDatas[0]);

  // show-hide password
  const [showPassword, setShowPassword] = useState<string>('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState<string>('password');

  // password eye hover set
  const [eyeHover, SetEyeHover] = useState('#34495e');
  const [eyeOffHover, SetEyeOffHover] = useState('#34495e');

  // confrim hover color set
  const [eyeHoverConfirm, SetEyeHoverConfirm] = useState('#34495e');
  const [eyeOffHoverConfirm, SetEyeOffHoverConfirm] = useState('#34495e');

  // to reset input after submit a data
  const [initialState, setInitialState] = useState<addUserAPISendDataType>({
    firstName: '', lastName: '', username: '',
    email: '', password: '', confirmPassword: '',
    workingAs: addUserWorkingAsDatas[0].value,
    designation: addUserDesignationDatas[0].value
  });

  // data to send
  const [datas, setDatas] = useState<addUserAPISendDataType>({
    firstName: '', lastName: '', username: '',
    email: '', password: '', confirmPassword: '',
    workingAs: selectedWorkingAsOption.value,
    designation: selectedOption.value
  });

  // select style
  const style = {
    control: (base: any, state: any) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      padding: '16px 15px',
      cursor: 'pointer',
      borderBottom: '1px solid #E9EBEB',
      backgroundColor: state.isSelected ? '#C10206' : 'transparent',
      color: state.isSelected ? 'white' : 'initial',
      '&:hover': {
        backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
        color: state.isSelected ? 'white' : 'initial',
      },
    }),
  };

  // user add function
  const handleUserAdd = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    // checking is user password match with confirm password
    if (datas.password !== datas.confirmPassword) {
      toast.error('Your password did not matched!');
      return;
    }

    // checking user password length is greater than 5
    if (datas.password.length < 6) {
      toast.error('Minimum six digits password!');
      return;
    }

    // checking user working as is selected
    if (datas.workingAs === '') {
      toast.error('Select user working as!');
      return;
    }

    // checking user role as is selected
    if (datas.designation === '') {
      toast.error('Select user role!');
      return;
    }

    const { confirmPassword, ...data } = datas;
    dispatch(
      signup(
        {
          ...data,
          username: data.username.toLowerCase().replace(/\s+/g, ''),
          email: data.email.toLowerCase(),
        },
        auth.token,
        initialState,
        setDatas,
        setSelectedOptions,
        setSelectedWorkingAsOptions,
      )
    );
  }

  return (
    <section>
      <div className={cx('', 'xl:w-full xl:flex xl:flex-col')}>
        <form className={cx('w-full flex flex-col')} onSubmit={handleUserAdd}>
          <div className={cx('', 'md:w-full md:grid md:grid-cols-2 md:gap-y-[20px] gap-x-[30px]')}>
            <Input
              label="First Name"
              placeholder="Enter first name"
              type="text"
              name="firstName"
              value={datas.firstName}
              onChange={e => setDatas({ ...datas, firstName: e.target.value })}
              required
            />

            <Input
              label="Last Name"
              placeholder="Enter last name"
              type="text"
              name="lastName"
              value={datas.lastName}
              onChange={e => setDatas({ ...datas, lastName: e.target.value })}
              required
            />

            <Input
              label="User Name"
              placeholder="Enter user name"
              type="text"
              name="username"
              value={datas.username}
              onChange={e => setDatas({ ...datas, username: e.target.value })}
              required
            />

            <Input
              label="Email"
              placeholder="Enter email"
              type="email"
              name="email"
              value={datas.email}
              onChange={e => setDatas({ ...datas, email: e.target.value })}
              required
            />

            <div className='relative'>
              <Input
                label="Password"
                placeholder="Enter password"
                type={showPassword}
                name="password"
                value={datas.password}
                onChange={e => setDatas({ ...datas, password: e.target.value })}
                required
              />
              <div className='absolute right-[22px] top-[51px] cursor-pointer'
                onClick={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}
              >
                {showPassword === 'password' ? <div
                  onMouseOver={() => SetEyeOffHover('black')}
                  onMouseLeave={() => SetEyeOffHover('#34495e')}>
                  <EyeOff hoverColor={eyeOffHover} />
                </div> : <div
                  onMouseOver={() => SetEyeHover('black')}
                  onMouseLeave={() => SetEyeHover('#34495e')}>
                  <Eye hoverColor={eyeHover} />
                </div>}
              </div>
            </div>

            <div className='relative'>
              <Input
                label="Confirm Password"
                placeholder="Enter confirm password"
                type={showConfirmPassword}
                name="confirmPassword"
                value={datas.confirmPassword}
                onChange={e => setDatas({ ...datas, confirmPassword: e.target.value })}
                required
              />
              <div className='absolute right-[22px] top-[51px] cursor-pointer'
                onClick={() => setShowConfirmPassword(showConfirmPassword === 'password' ? 'text' : 'password')}
              >
                {showConfirmPassword === 'password' ? <div
                  onMouseOver={() => SetEyeOffHoverConfirm('black')}
                  onMouseLeave={() => SetEyeOffHoverConfirm('#34495e')}>
                  <EyeOff hoverColor={eyeOffHoverConfirm} />
                </div> : <div
                  onMouseOver={() => SetEyeHoverConfirm('black')}
                  onMouseLeave={() => SetEyeHoverConfirm('#34495e')}>
                  <Eye hoverColor={eyeHoverConfirm} />
                </div>}
              </div>
            </div>

            <div className='add_user_select'>
              <p className="text-[16px] font-[500] leading-[22px] mb-[13px]">
                Working As
              </p>
              <Select
                defaultValue={addUserWorkingAsDatas[0]}
                className="rs-custom max-h-[150px]"
                classNamePrefix="rs-custom"
                styles={style}
                isSearchable={false}
                value={selectedWorkingAsOption}
                id="selectbox"
                instanceId="selectbox"
                onChange={(option: any) => {
                  setSelectedWorkingAsOptions(option)
                  setDatas({ ...datas, workingAs: option.value })
                }}
                options={addUserWorkingAsDatas}
                formatOptionLabel={({ title }: { title: string }) => <>{title}</>}
              />
            </div>

            <div className='add_user_select'>
              <p className="text-[16px] font-[500] leading-[22px] mb-[13px]">
                Role
              </p>
              <Select
                defaultValue={addUserDesignationDatas[0]}
                className="rs-custom max-h-[150px]"
                classNamePrefix="rs-custom"
                isSearchable={false}
                styles={style}
                value={selectedOption}
                id="selectbox"
                instanceId={useId()}
                onChange={(option: any) => {
                  setSelectedOptions(option)
                  setDatas({ ...datas, designation: option.value })
                }}
                options={addUserDesignationDatas}
                formatOptionLabel={({ title }: { title: string }) => <>{title}</>}
              />
            </div>

            <div className='md:col-span-2'>
              <div className={cx('w-full md:w-[200px] md:float-right', '', 'mt-5')}>
                <Button
                  className="!w-full md:px-[15px]"
                  rounded="md"
                  disabled={global.signup_loading}
                  loading={global.signup_loading}
                  loadingText={'Submiting'}
                >
                  Submit
                </Button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
}

export default AddUser;
