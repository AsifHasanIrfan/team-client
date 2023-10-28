import React, { useState, useEffect } from 'react';

import Modal from '@components/Modal';
import Button from '@components/Button';
import UploadIcon from '@components/Icons/Actions/UploadIcon';
import Input from '@components/Input';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { uploadFiles } from '@utils/uploadFile';
import axios from 'axios';
import { useAppSelector } from '@hooks/useRedux';
import Select from 'react-select';
import { IoMdClose } from 'react-icons/io';
import useUsers from '@hooks/useUsers';
import useBenefits from '@hooks/useBenefits';
import useBenefitsUser from '@hooks/useBenefitsUser';

type EditBenefitModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
};

const BenefitEditModal: React.FC<EditBenefitModalProps> = ({ open, setOpen, data }) => {
  // states
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState<any>();
  const [user, setUser] = useState<any>(null);
  const [usersOptions, setUsersOptions] = useState<any>();
  const [assignUsers, setAssignUsers] = useState<any>();
  const [imgUploadError, setImgUploadError] = useState({ img: '' });
  const [status, setStatus] = useState({ value: 'delete', label: 'Delete' });
  const [inputValue, setInputValue] = useState<any>({
    benefitAvatar: '',
    title: '',
    description: '',
    dgCost: 0,
  });

  useEffect(() => {
    setInputValue({
      benefitAvatar: '',
      title: data?.title,
      description: data?.description,
      subDescription: data?.subDescription,
      dgCost: data?.dgCost,
    });
    setStatus({
      value: data?.isArchived,
      label: `${data.isArchived ? 'Active' : 'Archived'}`
    });
    setImgSrc(data?.imgUrl);
  }, [data])

  // global states
  const { auth } = useAppSelector((state) => state);

  const { benefitsFetch } = useBenefits(auth.token);
  const { benefitsUsersFetch } = useBenefitsUser(auth.token);
  const { users } = useUsers(auth.token);

  const customStyle = {
    control: (provided: any) => ({
      ...provided,
      height: 0,
      minHeight: '33px',
      padding: 0,
      margin: 0,
      marginLeft: 0,
      border: '0px solid black',
      fontSize: 16,
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#C10206' : 'transparent',
      color: state.isSelected ? 'white' : 'initial',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
        color: state.isSelected ? 'white' : 'initial',
      },
    }),
  };

  // image handler
  const handleImageChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    if (!target.files) return;

    if (!target.files[0]?.name.match(/\.(jpg|jpeg|png|JPG|PNG)$/)) {
      setImgSrc('');
      setInputValue({ ...inputValue, benefitAvatar: [] });
      setImgUploadError({
        ...imgUploadError,
        img: 'Only jpg, jpeg & png file supported',
      });
    } else {
      setImgUploadError({ ...imgUploadError, img: '' });
      setImgSrc(URL.createObjectURL(target.files[0]));
      setInputValue({ ...inputValue, benefitAvatar: [target.files[0]] });
    }
  };

  // user select handler
  function handleUser(selectedUser: any) {
    setUser(selectedUser);
  }

  // user select handler
  function handleArchiveBenefit(selectedOption: any) {
    setStatus(selectedOption);
  }

  // archive options for select value
  const statusOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Archived' },
    { value: 'delete', label: 'Delete' }
  ];

  useEffect(() => {
    // user options
    const users_role =
      users?.users
        ?.filter((user: any) => user.role == 'employee')
        .map((e: any) => {
          return { label: `${e.firstName} ${e.lastName}`, value: e._id };
        }) || [];
    users_role.push({
      label: 'All Users',
      value: 'all'
    });
    const sortUsers = users_role.sort((a: any, b: any) => a.label.localeCompare(b.label));

    setUsersOptions(sortUsers);
  }, [users?.users]);

  useEffect(() => {
    if (users?.users) {
      const assignedUsers = data?.users.map((user: any) => {
        return {
          label: `${user.firstName} ${user.lastName}`,
          value: user._id,
        };
      });

      setAssignUsers(assignedUsers);
    }
  }, [users, data.users]);

  // assign user to benefit
  function handleAddUser() {
    if (!user) return;

    if (user.value === 'all') {
      const allUsers =
        users?.users
          ?.filter((user: any) => user.role == 'employee')
          .map((e: any) => {
            return { label: `${e.firstName} ${e.lastName}`, value: e._id };
          }) || [];

      if (assignUsers.length === allUsers.length) {
        toast.error('Already all users assigned');
      } else {
        setAssignUsers(allUsers);
      }
    } else {
      if (
        assignUsers.find((filteredItem: any) => filteredItem.value === user.value)
      ) {
        toast.error('This user has already assigned for this benefit');
      } else {
        setAssignUsers([...assignUsers, user]);
      }
    }
  }

  // onchange handler
  let onChange = (e: any): void => {
    setInputValue((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBenefitUpdate = async (e: any) => {
    e.preventDefault();
    let usersId = [];
    for (let i = 0; i < assignUsers.length; i++) {
      const element = assignUsers[i];
      usersId.push(element.value);
    }
    const benefitData = {
      imgUrl: '',
      title: inputValue.title,
      description: inputValue.description,
      subDescription: inputValue.subDescription,
      dgCost: inputValue.dgCost,
      users: usersId,
      isArchived: status.value
    };
    setLoading(true);
    // check image upload
    if (inputValue.benefitAvatar === '') {
      benefitData.imgUrl = data.imgUrl;
    } else {
      const res = await uploadFiles(inputValue.benefitAvatar);
      benefitData.imgUrl = res[0].url;
    }

    if (status.value === 'delete') {
      axios
        .delete(
          `${process.env.serverUrl}benefit/delete/${data._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          }
        )
        .then((response) => {
          setLoading(false);
          setOpen(false);
          if (response.data.success === false) {
            return toast.error(response.data.message);
          }
          if (response.data.success === true) {
            benefitsFetch();
            benefitsUsersFetch();
            toast.success(response.data.message);
          }
        });
    } else {
      axios
        .put(
          `${process.env.serverUrl}benefit/update-benefit/${data._id}`,
          benefitData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          }
        )
        .then((response) => {
          setLoading(false);
          setOpen(false);
          if (response.data.success === false) {
            return toast.error(response.data.message);
          }
          if (response.data.success === true) {
            benefitsFetch();
            toast.success(response.data.message);
          }
        });
    }
  };

  return (
    <span>
      <Modal setOpen={setOpen} open={open} title={'Edit Benefit'}>
        <div className="w-[330px] md:w-[500px] xl:w-[850px]">
          <form onSubmit={handleBenefitUpdate}>
            <div className="img-input">
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
                  accept=".jpg, .jpeg, .png, .JPG, .PNG"
                  id="img"
                  className="inputfile inputfile-1"
                  onChange={handleImageChange}
                />
                <label htmlFor="img" className="rounded">
                  <div className="flex items-center gap-2">
                    <UploadIcon />
                    <span>Change image&hellip;</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-5 -mb-4">
              <Input
                label={`Title`}
                placeholder={`Benefit title`}
                isRequired={true}
                name="title"
                onChange={onChange}
                value={inputValue.title}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-5">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                Sub Description
              </h2>
              <textarea
                className="text-lg focus:outline-none rounded-[8px] border border-[#E0E0E0] w-full py-5 px-5 mb-5"
                placeholder={`Add benefit sub description`}
                required
                name="subDescription"
                onChange={onChange}
                value={inputValue.subDescription}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-5">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                Description
              </h2>
              <textarea
                className="text-lg focus:outline-none rounded-[8px] border border-[#E0E0E0] w-full py-5 px-5 mb-5"
                placeholder={`Add benefit description`}
                required
                name="description"
                onChange={onChange}
                rows={5}
                value={inputValue.description}
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5">
              <Input
                label={`DG cost to unlock`}
                placeholder={`DG cost`}
                type={`number`}
                isRequired={true}
                name="dgCost"
                onChange={onChange}
                value={inputValue.dgCost}
              />
              <div className="w-full">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                  Status
                </h2>
                <div className="w-full p-5 py-[13px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
                  <Select
                    defaultValue={statusOptions.find(
                      (item: any) => item.value === data?.isArchived
                    )}
                    onChange={handleArchiveBenefit}
                    styles={customStyle}
                    options={statusOptions}
                  />
                </div>
              </div>
            </div>
            <div className="mb-[15px] sm:mb-[20px] w-full">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                Users
              </h2>
              <div className="flex gap-5">
                <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
                  <Select
                    onChange={handleUser}
                    styles={customStyle}
                    options={usersOptions}
                  />
                </div>
                <div>
                  <Button onClick={handleAddUser} type="button" rounded="md">
                    Add
                  </Button>
                </div>
              </div>
              {assignUsers && (
                <ul className="my-4 flex flex-wrap gap-3 min-h-[70px]">
                  {assignUsers
                    ?.sort((a: any, b: any) => a.label.localeCompare(b.label))
                    .map((people: any, i: number) => {
                      return (
                        <li
                          onClick={() => {
                            setAssignUsers((prev: any) =>
                              prev.filter(
                                (_: any, findIndex: number) => findIndex !== i
                              )
                            );
                          }}
                          key={i}
                          className="flex items-center justify-between h-fit gap-1 pl-2 pr-1 py-1 bg-primary cursor-pointer select-none hover:bg-lightHover duration-150 !text-slate-50 text-[13px] rounded-md"
                        >
                          {people?.label}
                          <span>
                            <IoMdClose color="white" size={15} />
                          </span>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>

            <div className="flex justify-end pb-5">
              <div
                className={`md:w-[200px] w-full h-[50px] mt-[15px] self-end`}
              >
                <Button
                  rounded="md"
                  className={`w-full h-full !text-sm !px-[15px]`}
                  disabled={loading}
                  loading={loading}
                  loadingText={'Updating'}
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </span>
  );
};
export default BenefitEditModal;
