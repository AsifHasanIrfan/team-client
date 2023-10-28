// external imports
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// internal imports
import Button from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { updateUserProfile } from '@redux/actions/users';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserActiveArchive from './components/UserActiveArchive';
import Swal from 'sweetalert2';

const UserInfo = ({
  setPageRefresh,
  pageRefresh,
  user,
}: {
  user: any;
  setPageRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  pageRefresh: boolean;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const { auth, users } = useAppSelector((state) => state);
  // const { user, update_data_loading } = users;

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [newImgSrc, setNewImgSrc] = useState(false);
  const [error, setError] = useState({ img: '' });
  const [input, setInput] = useState<any>({ avatar: [] });
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [isTeamLeaderLoading, setIsTeamLeaderLoading] = useState(false);

  // image change
  const handleImageChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    if (!target.files) return;

    if (!target.files[0]?.name.match(/\.(jpg|jpeg|png|JPG|PNG)$/)) {
      setImgSrc('');
      setInput({ ...input, avatar: [] });
      setError({ ...error, img: 'Only jpg, jpeg & png file supported' });
      setNewImgSrc(false);
    } else {
      setNewImgSrc(true);
      setError({ ...error, img: '' });
      setImgSrc(URL.createObjectURL(target.files[0]));
      setInput({ ...input, avatar: [target.files[0]] });
    }
  };

  // handleArchiveUser
  const handleArchiveUser = async (data: any) => {
    const isArchived = data;

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${!isArchived ? 'archive' : 'active'} this user!`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#C10206',
      confirmButtonText: 'Confirm!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {

          const callApi = async () => {
            const { data } = await axios.patch(
              `${process.env.serverUrl}/user/${id}/update-archived`,
              {
                isArchived,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${auth.token}`,
                },
              }
            );

            if (data.success) {
              setLoading(false);
              toast.success(data.message);
              setTimeout(() => {
                data?.isArchived !== 'true'
                  ? router.push('/dashboard/users')
                  : router.push('/dashboard/users/archived');
              }, 1000);
            } else {
              toast.error(data.message);
              setLoading(false);
            }
          }

          callApi();

        } catch (error) {
          toast.error('Something went wrong');
        }
      }
    });
  };

  // onsubmit
  let onSubmit = () => {
    setImageLoading(true);
    setTimeout(() => {
      setNewImgSrc(false);
      setImageLoading(false);
    }, 3000);

    dispatch(updateUserProfile(input, imgSrc, auth.token, id as string));
  };

  useEffect(() => {
    setImgSrc(user?.avatar);
  }, [user]);

  const handleMakeLeader = async () => {

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to make leader this user!`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#C10206',
      confirmButtonText: 'Confirm!',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsTeamLeaderLoading(true);
        try {
          const callApi = async () => {
            const { data } = await axios.patch(
              `${process.env.serverUrl}user/${id}/leader`,
              {},
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${auth?.token}`,
                },
              }
            );

            if (data.success) {
              setIsTeamLeaderLoading(false);
              setIsTeamLeader(true);
              toast.success(data.message);
            }
          }

          callApi();

        } catch (error) {
          toast.error('Something went wrong');
        }
      }
    });


  };

  useEffect(() => {
    if (users?.user?.workingAs === 'Team Leader') {
      setIsTeamLeader(true);
    } else {
      setIsTeamLeader(false);
    }
  }, [users?.user?.workingAs]);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between h-[150px] md:h-[112px] mt-[30px] md:mb-0 mb-[35px] gap-y-[30px] md:gap-y-0">
      <div className="w-[292px] h-full flex items-center justify-between gap-3">
        <div className="w-[112px] h-[112px] lg:h-full relative overflow-hidden border border-slate-200 rounded-full">
          {imgSrc && (
            <Image src={imgSrc} alt="user" layout="fill" objectFit="cover" />
          )}
        </div>
        <div className="w-[150px] h-[50px]">
          {!newImgSrc && (
            <Button className="w-full h-full !p-0 !rounded-[10px] cursor-pointer">
              <input
                type="file"
                name="img"
                id="img"
                className="hidden w-full h-full"
                onChange={handleImageChange}
              />
              <label
                htmlFor="img"
                className="flex items-center justify-center w-full h-full cursor-pointer"
              >
                <div className="flex items-center justify-center w-full h-full gap-2">
                  <span>Select photo</span>
                </div>
              </label>
            </Button>
          )}
          {newImgSrc && (
            <Button
              className="w-full h-full !p-0 !rounded-[10px] cursor-pointer"
              onClick={onSubmit}
              loading={imageLoading}
            >
              <div className="flex items-center gap-2">
                <span>Upload photo</span>
              </div>
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 ml-3">
        {isTeamLeader ? (
          <button
            className="px-[20px] h-[50px] border text-white bg-gray-300 outline-none !rounded-[10px]"
            onClick={handleMakeLeader}
            disabled={isTeamLeader || isTeamLeaderLoading}
          >
            Already a Team Leader
          </button>
        ) : (
          <button
            className="px-[20px] h-[50px] border border-[#FF0032] !bg-transparent text-[#FF0032] hover:!bg-primary hover:text-white !shadow-white !rounded-[10px] relative outline-none  hover:border-primary transition ease-in-out duration-300 w-[180px]"
            onClick={handleMakeLeader}
            disabled={isTeamLeader}
          >
            {isTeamLeaderLoading ? <div className="flex justify-center items-center h-auto -mt-[4px]">
              <div id="button__loading"></div>
            </div> : 'Make Team Leader'}
          </button>
        )}
        <UserActiveArchive
          handleArchiveUser={handleArchiveUser}
          loading={loading}
          user={user}
        />
      </div>
    </div>
  );
};
export default UserInfo;
