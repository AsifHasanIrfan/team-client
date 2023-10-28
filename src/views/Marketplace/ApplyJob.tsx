import Button from '@components/Button';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useApplyProjects from '@hooks/useApplyProjects';
import useMarketplace from '@hooks/useMarketplace';
import { useAppSelector } from '@hooks/useRedux';
import useUser from '@hooks/useUser';
import { uploadFiles } from '@utils/uploadFile';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useTimer } from '../../hooks/useTimer';
import AttachmentUpladSection from './components/ApplyJob/AttachmentUpladSection';
import BiddingTableSection from './components/ApplyJob/BiddingTableSection';
import PaymentMethodSection from './components/ApplyJob/PaymentMethodSection';
import ApplyButton from './components/Home/ApplyButton';
import { paymentMethodOptions } from './constants';

const ApplyJob = () => {
  // global
  const router = useRouter();
  const queryId = router.query.projectId;
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { user, userLoading } = useUser(auth?.token, auth?.user?._id);
  const { marketplace, marketplaceLoading, marketplaceFetch } = useMarketplace(
    auth?.token,
    queryId
  );
  const { applyProjectsFetch } = useApplyProjects(auth?.token, ``);
  const { isExpired } = useTimer(marketplace?.data?.expiredDate);

  // states
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethodOptions[0]
  );
  const [applyData, setApplyData] = useState({
    isDgTeamWillHandle: false,
    reason: '',
    attachment: [],
    bidAmount: null,
  });
  const [paymentMethodUrl, setPaymentMethodUrl] = useState<any>({
    label: '',
    value: '',
  });
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAttachment = (value: any) => {
    setApplyData((prev) => ({ ...prev, attachment: value }));
  };

  const getBidAmount = (value: any) => {
    setApplyData((prev) => ({ ...prev, bidAmount: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // checking payment method is selected
    if (selectedPaymentMethod.value === 'select') {
      toast.error('Select your payment method!');
      return;
    }

    // checking fill payment method details
    if (paymentMethodUrl.value === '') {
      toast.error(`Enter your ${selectedPaymentMethod.label} details!`);
      return;
    }

    // checking payment method url then check valid url
    if (paymentMethodUrl.value) {
      // checking fiverr url
      if (selectedPaymentMethod.value === 'fiverr') {
        const fiverrPattern =
          /(http(s?):\/\/)?(www\.)?fiverr\.([a-z])+\/([A-Za-z0-9]{1,})/i;
        if (!fiverrPattern.test(paymentMethodUrl.value)) {
          toast.error(`Please enter valid fiverr url!`);
          return;
        }
      }

      // checking upwork url
      if (selectedPaymentMethod.value === 'upwork') {
        const upworkPattern =
          /(http(s?):\/\/)?(www\.)?upwork\.([a-z])+\/([A-Za-z0-9]{1,})/i;
        if (!upworkPattern.test(paymentMethodUrl.value)) {
          toast.error(`Please enter valid upwork url!`);
          return;
        }
      }
    }

    // checking fill why perfect field
    if (applyData.reason === '') {
      toast.error(`why perfect field is required!`);
      return;
    }

    // checking is set bidAmount
    if (applyData.bidAmount === null) {
      toast.error(`Please set your bid amount!`);
      return;
    }

    let attachments: any = [];

    setLoading(true);
    if (applyData?.attachment?.length > 0) {
      attachments = await uploadFiles(applyData.attachment);
    }

    let applyDatas = {
      isDgTeamWillHandle: applyData.isDgTeamWillHandle,
      whyPerfect: applyData.reason,
      attachments: attachments,
      paymentNumber: '',
      paymentURL: '',
      paymentMethod: selectedPaymentMethod.value,
      biddingAmount: applyData.bidAmount,
      appliedWithDGCoin: marketplace?.data?.costOfCoin,
      user: user?.user?._id,
    };

    if (selectedPaymentMethod.value === 'localBank') {
      applyDatas.paymentNumber = paymentMethodUrl.value;
    } else {
      applyDatas.paymentURL = paymentMethodUrl.value;
    }

    axios
      .post(
        `${process.env.serverUrl}marketplace/apply/${marketplace?.data?._id}`,
        applyDatas,
        {
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${auth?.token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.success === false) {
          return toast.error(response.data.message);
        }
        if (response.data.success === true) {
          setApplyData({
            isDgTeamWillHandle: false,
            reason: '',
            attachment: [],
            bidAmount: null,
          });
          applyProjectsFetch();
          marketplaceFetch();
          router.push('/dashboard/marketplace');
          Swal.fire({
            icon: 'success',
            title: `Application Received`,
            text: 'Digital Gregg Team will contact you soon by whatsapp or email if the client has accepted your application for this project!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#C10206',
          });
        }
      });
  };

  // if job time expired return to marketplace page
  if (
    isExpired ||
    marketplace?.data?.appliedUsers.find(
      (item: any) => item === auth?.user?._id
    )
  ) {
    router.push(`/dashboard/marketplace`);
  }

  // loading
  if (!auth.token || userLoading || marketplaceLoading)
    return <FullPageLoader />;

  return (
    <div className="text-[#454545]">
      <form onSubmit={handleSubmit}>
        <PaymentMethodSection
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          setPaymentMethodUrl={setPaymentMethodUrl}
          paymentMethodUrl={paymentMethodUrl}
        />

        <div className="custom-checkbox w-max" role="button">
          <label
            htmlFor="terms"
            className="login-checkbox block relative top-0 pl-8 cursor-pointer text-base"
          >
            I want Digital Gregg to manage this project{' '}
            <span className="font-bold">(100% client Guaranteed)</span>
            <span className="text-primary font-bold ml-1">500 DG Coins</span>
            <input
              type="checkbox"
              id="terms"
              defaultChecked={applyData.isDgTeamWillHandle}
              onChange={() =>
                setApplyData((prev) => ({
                  ...prev,
                  isDgTeamWillHandle: !applyData.isDgTeamWillHandle,
                }))
              }
              className="absolute opacity-[0] cursor-pointer h-0 w-0"
            />
            <span className="checkmark absolute top-0 left-0 h-6 w-6 bg-[#FFF] border rounded-[6px] border-[#ccc] after:content-[''] after:absolute after:hidden after:left-[8px] after:top-[4px] after:w-[6px] after:h-[10px] after:border-[#FFF] after:border-[0_2.5px_2.5px_0]"></span>
          </label>
        </div>

        <div className="py-[40px]">
          <h4 className="font-[500] text-[18px]">
            Why you are perfect for this job?
          </h4>
          <textarea
            className="w-full mt-5 border outline-none py-[16px] px-[20px] border-[#E0E0E0] rounded-[8px]"
            placeholder="Type here..."
            rows={10}
            value={applyData.reason}
            onChange={(e) =>
              setApplyData((prev) => ({ ...prev, reason: e.target.value }))
            }
          ></textarea>
        </div>

        <AttachmentUpladSection getAttachment={getAttachment} />

        <div className="">
          <h4 className="font-[500] text-[18px] pb-2">
            Boost your application with DG Coins
          </h4>
          <p className="text-[14px] text-[#6D6D6D]">
            Use DG coins to bid for one of the top 3 proposals/resumes the
            clients recieves first.
          </p>
        </div>
        <div className="mt-[20px] mb-[40px]">
          <h4 className="font-[500] text-[18px] pb-2">How bidding works?</h4>
          <p className="text-[14px] text-[#6D6D6D]">
            We will deliver proposals and resumes to the client based on the top
            bidders once bidding time has ended. The client will either accept
            or decline a proposal then move on to the next. If there are no
            bids, the client will recieve propsals in the order they were
            recieved.
          </p>
        </div>

        <BiddingTableSection
          getBidAmount={getBidAmount}
          marketplace={marketplace?.data}
          user={user}
          amount={amount}
          setAmount={setAmount}
        />

        <div className="flex items-center md:flex-row flex-col justify-end gap-[15px] pt-5">
          <ApplyButton
            type="button"
            onClick={() => router.push('/dashboard/marketplace')}
            className={'md:order-none order-1 !py-3 !px-12 w-full sm:w-auto'}
          >
            Cancel
          </ApplyButton>
          <Button
            rounded="full"
            className="w-full sm:w-auto"
            disabled={loading}
            loading={loading}
            loadingText={'Submitting'}
          >
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplyJob;
