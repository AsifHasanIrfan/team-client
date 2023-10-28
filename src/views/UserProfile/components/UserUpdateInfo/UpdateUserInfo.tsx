import Button from '@components/Button';
import Eye from '@components/Icons/Actions/Eye';
import EyeOff from '@components/Icons/Actions/EyeOff';
import ProfileInput from '@components/Input/ProfileInput';
import {
  addUserDesignationDatas,
  addUserWorkingAsDatas,
  countryOptionsData,
  paymentMethodData,
} from '@config/constants';
import formatNumberInput from '@hooks/formatNumberInput';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { createNotification } from '@redux/actions/notification';
import Header from '@views/UserProfile/partials/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ProfileSelect from './ProfileSelect/ProfileSelect';

type Props = {
  user: any;
  userId: any;
  token: any;
};

const UpdateUserInfo = ({ user, userId, token }: Props) => {
  // global states
  const dispatch = useAppDispatch();
  const { auth, socket } = useAppSelector((state) => state);

  // states
  const [change, setChange] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [showPaymentNumberField, setShowPaymentNumberField] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [input, setInput] = useState<any>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    experience: '',
    paymentAddress: '',
    paymentMethod: '',
    phone: '',
    upwork: '',
    fiverr: '',
    github: '',
    facebook: '',
    behance: '',
    linkedin: '',
    dribble: '',
    others: '',
    weeklyOffday: '',
    payment: {
      name: '',
      number: '',
      country: '',
      bankName: '',
      accountName: '',
      districtName: '',
      branchName: '',
    },
    availableTimeOff: { sickDays: '', vacationDays: '' },
  });
  const [eyeHover, SetEyeHover] = useState('#34495e');
  const [eyeOffHover, SetEyeOffHover] = useState('#34495e');

  // selected state
  const [selectedOption, setSelectedOption] = useState<any>(
    addUserWorkingAsDatas[0]
  );
  const [roleOption, setRoleOption] = useState<any>(addUserDesignationDatas[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(
    paymentMethodData[0]
  );
  const [selectedCountry, setSelectedCountry] = useState<any>(
    countryOptionsData[0]
  );

  // set user got data
  useEffect(() => {
    setInput({
      firstName: user?.firstName,
      lastName: user?.lastName,
      username: user?.username,
      email: user?.email,
      address: user?.address,
      experience: user?.experience,
      phone: user?.phone,
      upwork: user?.upwork,
      fiverr: user?.fiverr,
      github: user?.github,
      facebook: user?.facebook,
      behance: user?.behance,
      linkedin: user?.linkedin,
      dribble: user?.dribble,
      others: user?.others,
      paymentAddress: user?.paymentAddress,
      weeklyOffday: user?.weeklyOffday,
      payment: {
        name: user?.payment?.name,
        number: user?.payment?.number,
        bankName: user?.payment?.bankName,
        accountName: user?.payment?.accountName,
        districtName: user?.payment?.districtName,
        branchName: user?.payment?.branchName,
      },
      availableTimeOff: {
        sickDays: user?.availableTimeOff?.sickDays,
        vacationDays: user?.availableTimeOff?.vacationDays,
      },
    });
    setSelectedCountry(
      countryOptionsData.find((item) => item?.value === user?.payment?.country)
    );
    setSelectedOption(
      addUserWorkingAsDatas.find((item) => item?.value === user?.workingAs)
    );
    setRoleOption(
      addUserDesignationDatas.find((item) => item?.value === user?.designation)
    );
    setSelectedPaymentMethod(
      paymentMethodData.find(
        (item: any) =>
          item?.value.toLowerCase() === user?.payment?.name.toLowerCase()
      )
    );
  }, [user]);

  useEffect(() => {
    if (selectedPaymentMethod?.value === 'bank') {
      setShowFields(true);
    } else {
      setShowFields(false);
    }

    if (selectedPaymentMethod?.value !== '') {
      setShowPaymentNumberField(true);
    } else {
      setShowPaymentNumberField(false);
    }
  }, [selectedPaymentMethod?.value]);

  // submitting data for update
  const handleSubmit = async () => {
    // patterns
    const facebookPattern =
      /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
    const githubPattern = /^https:\/\/[a-z]{2,3}\.github\.com\/.*$/gim;
    const linkedinPattern = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/gim;
    const behancePattern =
      /(http(s?):\/\/)?(www\.)?behance\.([a-z])+\/([A-Za-z0-9]{1,})/i;
    const dribblePattern =
      /(http(s?):\/\/)?(www\.)?dribbble\.([a-z])+\/([A-Za-z0-9]{1,})/i;
    const urlPattern = new RegExp(
      '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    );
    // fiverr pattern check
    const fiverrPattern =
      /(http(s?):\/\/)?(www\.)?fiverr\.([a-z])+\/([A-Za-z0-9]{1,})/i;
    // up work pattern check
    const upworkPattern =
      /(http(s?):\/\/)?(www\.)?upwork\.([a-z])+\/([A-Za-z0-9]{1,})/i;

    // check fiverr url
    if (input.fiverr !== '') {
      if (!fiverrPattern.test(input.fiverr)) {
        toast.error('Please enter valid fiverr url!');
        return;
      }
    }

    // check upwork url
    if (input.upwork !== '') {
      if (!upworkPattern.test(input.upwork)) {
        toast.error('Please enter valid upwork url!');
        return;
      }
    }

    // check facebook url
    if (input.facebook !== '') {
      if (!facebookPattern.test(input.facebook)) {
        toast.error('Please enter valid facebook url!');
        return;
      }
    }

    // check github url
    if (input.github !== '') {
      if (!githubPattern.test(input.github)) {
        toast.error('Please enter valid github url!');
        return;
      }
    }

    // check linkedin url
    if (input.linkedin !== '') {
      if (!linkedinPattern.test(input.linkedin)) {
        toast.error('Please enter valid linkedin url!');
        return;
      }
    }

    // check dribbble url
    if (input.dribble !== '') {
      if (!dribblePattern.test(input.dribble)) {
        toast.error('Please enter valid dribble url!');
        return;
      }
    }

    // check behance url
    if (input.behance !== '') {
      if (!behancePattern.test(input.behance)) {
        toast.error('Please enter valid behance url!');
        return;
      }
    }

    // check others url
    if (input.others !== '') {
      if (!urlPattern.test(input.others)) {
        toast.error('Please enter valid other url!');
        return;
      }
    }

    // check others url
    if (input?.password !== '') {
      if (input?.password?.length < 6) {
        toast.error('Minimum six digit password');
        return;
      }
    }

    if (selectedOption?.value === '') {
      toast.error('Please select working as');
      return;
    }
    if (roleOption?.value === '') {
      toast.error('Please select role');
      return;
    }

    const prepareData = {
      ...input,
      password: password,
      workingAs: selectedOption?.value,
      designation: roleOption?.value,
      payment: {
        ...input.payment,
        name: selectedPaymentMethod?.value,
        country: selectedCountry?.value,
      },
      availableTimeOff: {
        sickDays: parseInt(input.availableTimeOff.sickDays),
        vacationDays: parseInt(input.availableTimeOff.vacationDays),
      },
    };
    let { username, ...sendData } = prepareData;

    setChange(true);
    const { data } = await axios.patch(
      `${process.env.serverUrl}user/update/Profile/${userId}`,
      sendData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setChange(false);
      const notifyData = {
        recipients: [userId],
        url: '/dashboard/profile',
        // @ts-ignore
        content: `Your account information has been updated by admin`,
      };

      dispatch(createNotification(notifyData, auth.token, socket));
      toast.success(data.message);
    } else {
      setChange(false);
      toast.error(data.message);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[10px] mt-[30px]">
        <ProfileInput
          label={'First Name'}
          id={'firstName'}
          value={input?.firstName}
          isRequired={true}
          placeholder={'Enter first name'}
          onChange={(e: any) =>
            setInput({ ...input, firstName: e.target.value })
          }
        />

        <ProfileInput
          label={'Last Name'}
          id={'lastName'}
          value={input?.lastName}
          isRequired={true}
          placeholder={'Enter last name'}
          onChange={(e: any) =>
            setInput({ ...input, lastName: e.target.value })
          }
        />

        <ProfileInput
          label={'Username'}
          id={'username'}
          value={input?.username}
          isRequired={true}
          isReadonly={true}
          placeholder={'Enter username'}
          onChange={(e: any) =>
            setInput({ ...input, username: e.target.value })
          }
        />

        <ProfileInput
          label={'Email'}
          id={'email'}
          value={input?.email}
          isRequired={true}
          isReadonly={true}
          placeholder={'admin@example.com'}
          onChange={(e: any) => setInput({ ...input, email: e.target.value })}
        />

        <div className="relative">
          <ProfileInput
            label={'Password'}
            id={'password'}
            value={password}
            isRequired={true}
            type={showPassword ? 'text' : 'password'}
            placeholder={'Enter password'}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <div
            className="absolute right-[20px] top-[53px] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <div
                onMouseOver={() => SetEyeOffHover('black')}
                onMouseLeave={() => SetEyeOffHover('#34495e')}
              >
                <EyeOff hoverColor={eyeOffHover} />
              </div>
            ) : (
              <div
                onMouseOver={() => SetEyeHover('black')}
                onMouseLeave={() => SetEyeHover('#34495e')}
              >
                <Eye hoverColor={eyeHover} />
              </div>
            )}
          </div>
        </div>

        <ProfileInput
          label={'Address'}
          id={'address'}
          value={input?.address}
          isRequired={true}
          placeholder={'Enter address'}
          onChange={(e: any) => setInput({ ...input, address: e.target.value })}
        />

        <ProfileInput
          label={'Experience'}
          id={'experience'}
          type={'number'}
          value={input?.experience}
          placeholder={'Enter experience of employee'}
          onChange={(e: any) =>
            setInput({ ...input, experience: e.target.value })
          }
          onKeyDown={(e: any) => formatNumberInput(e)}
        />

        <ProfileInput
          label={'Phone'}
          id={'phone'}
          type={'number'}
          value={input?.phone}
          isRequired={true}
          placeholder={'Enter phone'}
          onKeyDown={(e: any) => formatNumberInput(e)}
          onChange={(e: any) => setInput({ ...input, phone: e.target.value })}
        />

        <ProfileSelect
          label="Working As"
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={addUserWorkingAsDatas}
        />

        <ProfileSelect
          label="Role"
          selectedOption={roleOption}
          setSelectedOption={setRoleOption}
          options={addUserDesignationDatas}
        />

        <ProfileInput
          label={'Upwork'}
          id={'upwork'}
          value={input?.upwork}
          mainCss={'mt-4'}
          placeholder={'Enter upwork link'}
          onChange={(e: any) =>
            setInput({ ...input, upwork: e.target.value })
          }
        />

        <ProfileInput
          label={'Fiverr'}
          id={'fiverr'}
          mainCss={'mt-4'}
          value={input?.fiverr}
          placeholder={'Enter fiverr link'}
          onChange={(e: any) =>
            setInput({ ...input, fiverr: e.target.value })
          }
        />

        <ProfileInput
          label={'Faceboook'}
          id={'facebook'}
          value={input?.facebook}
          placeholder={'Enter facebook link'}
          onChange={(e: any) =>
            setInput({ ...input, facebook: e.target.value })
          }
        />

        <ProfileInput
          label={'Linkedin'}
          id={'linkedin'}
          value={input?.linkedin}
          placeholder={'Enter linkedin link'}
          onChange={(e: any) =>
            setInput({ ...input, linkedin: e.target.value })
          }
        />

        <ProfileInput
          label={'Dribble'}
          id={'dribble'}
          value={input?.dribble}
          placeholder={'Enter dribble link'}
          onChange={(e: any) => setInput({ ...input, dribble: e.target.value })}
        />

        <ProfileInput
          label={'Behance'}
          id={'behance'}
          value={input?.behance}
          placeholder={'Enter behance link'}
          onChange={(e: any) => setInput({ ...input, behance: e.target.value })}
        />

        <ProfileInput
          label={'Github'}
          id={'github'}
          value={input?.github}
          placeholder={'Enter github link'}
          onChange={(e: any) => setInput({ ...input, github: e.target.value })}
        />

        <ProfileInput
          label={'Other'}
          id={'others'}
          value={input?.others}
          placeholder={'Enter other link'}
          onChange={(e: any) => setInput({ ...input, others: e.target.value })}
        />

        <ProfileInput
          label={'Weekly Off Day'}
          id={'offday'}
          type={'text'}
          isReadonly={true}
          value={input?.weeklyOffday}
          placeholder={'Weekly off day not selected'}
          onChange={(e: any) =>
            setInput({
              ...input,
              weeklyOffday: e.target.value,
            })
          }
        />

        <ProfileInput
          label={'DG Coin'}
          id={'dgCOin'}
          type={'number'}
          isReadonly={true}
          value={user?.dgCoin}
          placeholder={'Amount of dg coint'}
        />
      </div>

      <hr className='mt-[30px]' />

      {/* payment informations */}
      <div>
        {/* <Header>Payment information</Header> */}
        <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[10px] my-[30px]'>
          <ProfileSelect
            label="Payment Method"
            options={paymentMethodData}
            selectedOption={selectedPaymentMethod}
            setSelectedOption={setSelectedPaymentMethod}
            paymentSelect={true}
          />

          {showPaymentNumberField ? <ProfileInput
            label={selectedPaymentMethod?.value === 'bkash' ? 'Bkash Number' : 'Account Number'}
            id={'paymentNumber'}
            type={'number'}
            value={input?.payment?.number}
            placeholder={`Enter ${selectedPaymentMethod?.value === 'bkash' ? 'bkash' : 'account'} number`}
            onKeyDown={(e: any) => formatNumberInput(e)}
            onChange={(e: any) =>
              setInput({
                ...input,
                payment: { ...input.payment, number: e.target.value },
              })
            }
          /> : null}

          {showFields && (
            <>
              <ProfileSelect
                label="Country"
                options={countryOptionsData}
                selectedOption={selectedCountry}
                setSelectedOption={setSelectedCountry}
                paymentSelect={true}
              />

              <ProfileInput
                label={'Bank Name'}
                id={'bankName'}
                value={input?.payment?.bankName}
                placeholder={'Enter bank name'}
                onChange={(e: any) =>
                  setInput({
                    ...input,
                    payment: { ...input.payment, bankName: e.target.value },
                  })
                }
              />

              <ProfileInput
                label={'Account Name'}
                id={'accountName'}
                value={input?.payment?.accountName}
                placeholder={'Enter account name'}
                onChange={(e: any) =>
                  setInput({
                    ...input,
                    payment: { ...input.payment, accountName: e.target.value },
                  })
                }
              />

              <ProfileInput
                label={'District Name'}
                id={'districtName'}
                value={input?.payment?.districtName}
                placeholder={'Enter district name'}
                onChange={(e: any) =>
                  setInput({
                    ...input,
                    payment: { ...input.payment, districtName: e.target.value },
                  })
                }
              />

              <ProfileInput
                label={'Branch Name'}
                id={'branchName'}
                value={input?.payment?.branchName}
                placeholder={'Enter branch name'}
                onChange={(e: any) =>
                  setInput({
                    ...input,
                    payment: { ...input.payment, branchName: e.target.value },
                  })
                }
              />
            </>
          )}
        </div>
      </div>


      <div className="w-full h-[50px] flex mt-[30px] items-center justify-end">
        <Button
          className="w-[200px] h-full !p-0 !rounded-[10px]"
          onClick={handleSubmit}
          disabled={
            selectedOption?.value === '' || roleOption?.value === '' || change
          }
          loading={change}
          loadingText={'Updating'}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateUserInfo;
