import React, { useEffect, useState } from 'react';
import { cx, settingInformationInputDatas } from '@config/constants';
import Input from '@views/Setting/Input';
import Button from '@components/Button';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { updateUserData } from '@redux/actions/users';
import toast from 'react-hot-toast';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import UploadIcon from '@components/Icons/Actions/UploadIcon';
import formatNumberInput from '@hooks/formatNumberInput';
import { useAuth } from '@state/index';

const BasicInformationForm: React.FC = () => {
  // global states
  const dispatch = useAppDispatch();
  const { auth, users, socket } = useAppSelector((state) => state);

  const { isAdmin } = useAuth()

  // states
  const [isDisabled, setIsDisabled] = useState(true)

  const [imgSrc, setImgSrc] = useState(auth.user?.avatar);
  const [error, setError] = useState({ img: '' });
  const [urlErrs, setUrlErrs] = useState({
    facebook: false,
    linkedin: false,
    dribble: false,
    behance: false,
    github: false,
    fiverr: false,
    upwork: false,
    others: false
  })

  const [input, setInput] = useState<any>({
    firstName: auth.user?.firstName,
    lastName: auth.user?.lastName,
    email: auth.user?.email,
    phone: auth.user?.phone,
    facebook: auth.user?.facebook,
    linkedin: auth.user?.linkedin,
    dribble: auth.user?.dribble,
    behance: auth.user?.behance,
    github: auth.user?.github,
    others: auth.user?.other,
    avatar: [],
  });

  const [UDinput, setUDInput] = useState<any>({})

  useEffect(() => {
    setInput({
      firstName: auth.user?.firstName || '',
      lastName: auth.user?.lastName || '',
      email: auth.user?.email || '',
      phone: auth.user?.phone || '',
      facebook: auth.user?.facebook || '',
      linkedin: auth.user?.linkedin || '',
      dribble: auth.user?.dribble || '',
      behance: auth.user?.behance || '',
      github: auth.user?.github || '',
      others: auth.user?.others || '',
      address: auth.user?.address || '',
      experience: auth.user?.experience || '',
      fiverr: auth.user?.fiverr || '',
      upwork: auth.user?.upwork || '',
    });

    setImgSrc(auth.user?.avatar);
  }, [auth.user]);

  // image change
  const handleImageChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    if (!target.files) return;

    if (!target.files[0]?.name.match(/\.(jpg|jpeg|png|JPG|PNG)$/)) {
      setImgSrc("");
      setInput({ ...input, avatar: [] });
      setError({ ...error, img: 'Only jpg, jpeg & png file supported' });
    } else {
      setError({ ...error, img: '' });
      setImgSrc(URL.createObjectURL(target.files[0]));

      if (auth.user.avatar !== imgSrc) {
        setIsDisabled(false)
      } else {
        true
      }
      setUDInput({ ...UDinput, avatar: [target.files[0]] });
      setInput({ ...input, avatar: [target.files[0]] });

      if (imgSrc === UDinput.avatar) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  };

  // onsubmit
  let onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // facebook pattern check
    const facebookPattern =
      /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
    // github pattern check
    const githubPattern = /^https:\/\/[a-z]{2,3}\.github\.com\/.*$/gim;
    // const githubPattern = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim;
    // linkedin pattern check
    const linkedinPattern = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/gim;
    // behance pattern check
    const behancePattern = /(http(s?):\/\/)?(www\.)?behance\.([a-z])+\/([A-Za-z0-9]{1,})/i;
    // dribble pattern check
    const dribblePattern = /(http(s?):\/\/)?(www\.)?dribbble\.([a-z])+\/([A-Za-z0-9]{1,})/i;
    // otheers pattern check
    const urlPattern = new RegExp(
      '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    );
    // fiverr pattern check
    const fiverrPattern =/(http(s?):\/\/)?(www\.)?fiverr\.([a-z])+\/([A-Za-z0-9]{1,})/i;
    // up work pattern check
     const upworkPattern =/(http(s?):\/\/)?(www\.)?upwork\.([a-z])+\/([A-Za-z0-9]{1,})/i;

    // check fiverr url
    if (input.fiverr !== '') {
      if (!fiverrPattern.test(input.fiverr)) {
        // toast.error('Please enter valid facebook url!');
        setUrlErrs({ ...urlErrs, fiverr: true });
        return;
      }
    }

    // check upwork url
    if (input.upwork !== '') {
      if (!upworkPattern.test(input.upwork)) {
        // toast.error('Please enter valid facebook url!');
        setUrlErrs({ ...urlErrs, upwork: true });
        return;
      }
    }

    // check facebook url
    if (input.facebook !== '') {
      if (!facebookPattern.test(input.facebook)) {
        // toast.error('Please enter valid facebook url!');
        setUrlErrs({ ...urlErrs, facebook: true })
        return;
      }
    }

    // check github url
    if (input.github !== '') {
      if (!githubPattern.test(input.github)) {
        // toast.error('Please enter valid github url!');
        setUrlErrs({ ...urlErrs, github: true })
        return;
      }
    }

    // check linkedin url
    if (input.linkedin !== '') {
      if (!linkedinPattern.test(input.linkedin)) {
        // toast.error('Please enter valid linkedin url!');
        setUrlErrs({ ...urlErrs, linkedin: true })
        return;
      }
    }

    // check dribbble url
    if (input.dribble !== '') {
      if (!dribblePattern.test(input.dribble)) {
        // toast.error('Please enter valid dribble url!');
        setUrlErrs({ ...urlErrs, dribble: true })
        return;
      }
    }

    // check behance url
    if (input.behance !== '') {
      if (!behancePattern.test(input.behance)) {
        // toast.error('Please enter valid behance url!');
        setUrlErrs({ ...urlErrs, behance: true })
        return;
      }
    }

    // check others url
    if (input.others !== '') {
      if (!urlPattern.test(input.others)) {
        // toast.error('Please enter valid other url!');
        setUrlErrs({ ...urlErrs, others: true })
        return;
      }
    }

    // check phone number is greter than 10
    if (input.phone !== '') {
      if (input.phone.length < 11) {
        toast.error('Phone number must be greater than 10!');
        return;
      }
    }

    // else submit data
    if (auth.token) {
      dispatch(updateUserData(UDinput, imgSrc, auth, auth.user._id, socket));
    }
  };

  // onchange handler
  let onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 
    let unsaveInp = {
      firstName: auth.user?.firstName || '',
      lastName: auth.user?.lastName || '',
      email: auth.user?.email || '',
      phone: auth.user?.phone || '',
      facebook: auth.user?.facebook || '',
      linkedin: auth.user?.linkedin || '',
      dribble: auth.user?.dribble || '',
      behance: auth.user?.behance || '',
      github: auth.user?.github || '',
      others: auth.user?.others || '',
    }

    setInput((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    unsaveInp = {
      ...unsaveInp,
      [e.target.name]: e.target.value,
    }

    //
    if (auth.user) {
      const { firstName, lastName, email, phone, facebook, linkedin, dribble, behance, github, others } = auth.user

      if (firstName === unsaveInp.firstName && lastName === unsaveInp.lastName && email === unsaveInp.email && phone.toString() === unsaveInp.phone && facebook === unsaveInp.facebook && linkedin === unsaveInp.linkedin && dribble === unsaveInp.dribble && behance === unsaveInp.behance && github === unsaveInp.github && others === unsaveInp.others) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    }
    //

    setUDInput((prev: any) => ({
      ...(e.target.value !== input[e.target.name] ? prev : {}),
      [e.target.name]: e.target.value,
    }));

    setUrlErrs((prev: any) => ({
      ...prev,
      [e.target.name]: false,
    }));
  };


  // loader
  if (!auth.token) return <FullPageLoader />;

  return (
    <div className={cx('', 'xl:w-full xl:flex xl:flex-col')}>
      <form onSubmit={onSubmit} className={cx('w-full flex flex-col')}>
        <div
          className={cx(
            '',
            'xl:w-full xl:grid xl:grid-cols-2 xl:gap-y-[20px] gap-x-[30px]'
          )}
        >
          <div className="col-span-2 mb-2 img-input">
            {imgSrc && (
              <div className="mb-2 text-center add-img">
                <Image
                  width={100}
                  height={100}
                  src={imgSrc}
                  alt="pro"
                  objectFit="cover"
                />
              </div>
            )}
            <div className="text-center box">
              <input
                type="file"
                name="img"
                id="img"
                className="inputfile inputfile-1"
                onChange={handleImageChange}
              />
              <label htmlFor="img">
                <div className="flex items-center gap-2">
                  <UploadIcon />
                  <span>Choose a file&hellip;</span>
                </div>
              </label>
            </div>
          </div>

          {settingInformationInputDatas.map((item, index) => (
            <Input
              key={index}
              label={item.label}
              required={item.required}
              placeholder={item.placeholder}
              value={input[item.id]}
              name={item.name}
              error={item?.error}
              type={item.type}
              urlErrs={urlErrs}
              onChange={onChange}
              onKeyDown={(e) => formatNumberInput(e)}
            />
          ))}
        </div>

        <div className={cx('w-full md:w-[200px]', 'md:self-end', 'mt-4')}>
          <Button
            className="!w-full md:px-[15px]"
            rounded="md"
            disabled={isDisabled}
            loading={users.update_data_loading}
            loadingText={isAdmin ? 'Updating' : 'Requesting'}
          >
            {isAdmin ? 'Update information' : 'Request update'}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default BasicInformationForm;
