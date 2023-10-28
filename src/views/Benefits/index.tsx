import Button from '@components/Button';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useBenefitsUser from '@hooks/useBenefitsUser';
import { useAppSelector } from '@hooks/useRedux';
import useEMP from '@hooks/useTeamMemberOfTheMonth';
import useUser from '@hooks/useUser';
import { useAuth } from '@state/index';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AvailableBenefits from './components/AvailableBenefits';
import GotBenefits from './components/GotBenefits';
import UnavailableBenefits from './components/UnavailableBenefits/UnavailableBenefits';

export default function Benefits() {

  const [userBenefits, setUserBenefits] = useState<any>([]);
  const [userUpComingBenefits, setUserUpComingBenefits] = useState<any>([]);
  const [unlockedBenefits, setUnlockedBenefits] = useState<any>([]);
  const [filterTabValue, setFilterTabValue] = useState('available');

  const { auth } = useAppSelector((state) => state);
  const { benefitsUsers, benefitsUsersFetch, benefitsUsersLoading } = useBenefitsUser(auth.token);
  const { user, userFetch, userLoading } = useUser(auth.token, auth?.user?._id);
  const { empsFetch } = useEMP(auth.token);

  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if (benefits?.datas && user?.user) {

    let assignedBenefits: any = [];
    let upcomingBenefits: any = [];

    const activeBenefits = benefitsUsers?.datas?.filter(
      (e: any) => e.isArchived === true
    );

    for (let i = 0; i < activeBenefits?.length; i++) {
      const benefit = activeBenefits[i];

      const isBenefitUser = benefit.users.find(
        (e: any) => e._id === user?.user?._id
      );

      if (!user?.user?.purchasedBenefits?.length) {
        if (isBenefitUser) {
          assignedBenefits.push(benefit);
        } else {
          upcomingBenefits.push(benefit);
        }
      } else {
        benefitsUsers?.datas?.map((item: any) => {
          const foundInBenefitPurchasedUsers = benefit.purchasedUsers.find(
            (el: any) => el.userId === isBenefitUser?._id
          );
          const foundInBenefitAssignedUsers = benefit.users.find(
            (el: any) => el._id === isBenefitUser?._id
          );

          if (
            foundInBenefitPurchasedUsers === undefined &&
            foundInBenefitAssignedUsers !== undefined
          ) {
            const isAlready = assignedBenefits.find(
              (item: any) => item._id === benefit._id
            );
            if (isAlready === undefined) {
              assignedBenefits.push(benefit);
            }
          }

          if (!isBenefitUser) {
            const isAlready = upcomingBenefits.find(
              (item: any) => item._id === benefit._id
            );
            if (isAlready === undefined) {
              upcomingBenefits.push(benefit);
            }
          }
        });
      }
    }

    setUserBenefits(assignedBenefits);
    setUserUpComingBenefits(upcomingBenefits);
    // }
  }, [benefitsUsers?.datas, user?.user]);

  // benefit unlock handler
  const handleUnlockBenefit = (item: any, userId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to unlock this benefit with ${item.dgCost} coins!`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#C10206',
      confirmButtonText: 'Yes, unlock it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const purchasedData = {
          benefitId: item._id,
          userId: userId,
          unlockCost: item.dgCost,
        };

        axios
          .post(`${process.env.serverUrl}benefit/purchase`, purchasedData, {
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${auth.token}`,
            },
          })
          .then((res) => {
            if (res.data.success === false) {
              Swal.fire(
                'Failed to purchase benefit',
                res.data.message,
                'error'
              );
            }
            if (res.data.success === true) {
              userFetch();
              benefitsUsersFetch();
              empsFetch();
              Swal.fire('Unlocked!', res.data.message, 'success');
            }
          });
      }
    });
  };

  return (
    <>
      {!auth.token || benefitsUsersLoading || userLoading ? (
        <FullPageLoader />
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-[auto,450px] 2xl:grid-cols-3 gap-[30px]">
            <div className="2xl:col-span-2">
              <div className="flex sm:flex-row flex-col items-center justify-between">
                <div className="flex gap-12 py-3 border-b border-[#E9EBEB] px-1">
                  <button
                    type="button"
                    onClick={() => setFilterTabValue('available')}
                    className={`lg:text-[22px] text-sm outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterTabValue === 'available' && '!text-darkHover'
                      } }`}
                  >
                    Available
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterTabValue('unavailable')}
                    className={`lg:text-[22px] text-sm outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterTabValue === 'unavailable' && ' !text-darkHover '
                      } }`}
                  >
                    Unavailable
                  </button>
                </div>
                <div>
                  {isAdmin && (
                    <Button
                      onClick={() => router.push('/dashboard/add-benefits')}
                    >
                      Add Benefits
                    </Button>
                  )}
                </div>
              </div>
              {filterTabValue === 'available' && (
                <AvailableBenefits
                  userBenefits={userBenefits}
                  handleUnlockBenefit={handleUnlockBenefit}
                />
              )}
              {filterTabValue === 'unavailable' && (
                <UnavailableBenefits
                  userUpComingBenefits={userUpComingBenefits}
                />
              )}
            </div>
            <div className="2xl:col-span-1 lg:mt-16">
              <GotBenefits currentBenefits={user?.user?.purchasedBenefits} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
