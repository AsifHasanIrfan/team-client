import BriefCase from '@components/Icons/images/BriefCase';
import Dollar from '@components/Icons/images/Dollar';
import ApplyButton from '@views/Marketplace/components/Home/ApplyButton';
import axios from 'axios';
import fileDownload from 'js-file-download';
import moment from 'moment';
import { useRouter } from 'next/router';
import { ImAttachment } from 'react-icons/im';
const parse = require('html-react-parser');

type Props = {
  data: any;
  paymentMethod?: any;
  paymentURL?: any;
  paymentInfo?: boolean;
  paymentNumber?: any;
  id?: any;
};

const Description = ({ data, paymentMethod, paymentURL, id, paymentInfo, paymentNumber }: Props) => {
  const router = useRouter();

  // download function
  const handleDownload = (url: any, filename: any) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <div className="p-[30px] rounded-[20px] bg-[#FFFFFF] tasksPage-shadow relative">
      <h1 className="lg:text-[26px] text-[20px] font-semibold leading-[30px]">
        {data?.title}
      </h1>
      <h3 className="lg:text-[18px] text-base text-primary fonr-semibold leading-[21px] mt-[16px] capitalize">
        {data?.category}
      </h3>
      <h3 className="text-[#949494] lg:text-[16px] text-[12px] leading-[150%] mt-[16px]">
        Posted {moment(data?.createdAt).fromNow()}
      </h3>

      <div className="my-[30px]">
        <hr />
      </div>

      <h1 className="text-[20px] font-bold mb-[20px] leading-[142.5%]">
        Job Details
      </h1>

      <div className="flex items-center gap-[100px]">
        <div>
          <div className="flex items-center gap-[8px]">
            <BriefCase />
            <h5 className="text-[#454545] font-semibold text-[14px] leading-[16px]">
              Project length:{' '}
            </h5>
          </div>
          <p className="text-[14px] text-[#454545] mt-[6px] ml-[22px]">
            {data?.length}
          </p>
        </div>
        <div className="relative -top-[2px]">
          <div className="flex items-center gap-[8px] relative -top-[2px]">
            <Dollar />
            <h5 className="text-[#454545] font-semibold text-[14px] leading-[16px]">
              Budget:{' '}
            </h5>
          </div>
          <p className="text-[14px] text-[#454545] mt-[6px] ml-[22px]">
            ${data?.budget}
          </p>
        </div>
      </div>

      <div className="my-[30px]">
        <hr />
      </div>

      <h1 className="text-[20px] font-bold mb-[20px] leading-[142.5%]">
        Job Description
      </h1>
      <p className="leading-[150%] text-[#949494]">
        {parse(data?.description)}
      </p>

      <div className="my-[30px]">
        <hr />
      </div>

      {data?.attachments?.length > 0 && (
        <div className="mb-[20px] ">
          <h1 className="text-[20px] font-bold mb-[20px] leading-[142.5%]">
            Attachments
          </h1>

          {data?.attachments?.map(({ name, url }: any, i: number) => (
            <div
              key={i}
              onClick={() => handleDownload(url, name)}
              className="text-[16px] leading-[22px] text-[#0075FF] cursor-pointer gap-[5px] flex items-center w-max mb-[8px]"
            >
              <ImAttachment fontSize={18} />
              <p> {name} </p>
            </div>
          ))}
        </div>
      )}
      {paymentInfo && (
        <div>
          <div className="my-[30px]">
            <hr />
          </div>
          <h1 className="text-[20px] font-bold mb-[20px] leading-[142.5%]">
            Payment Method
          </h1>
          <p className="text-[#454545]">
            The payment method client will see on your application
          </p>
          <div className="flex items-center gap-1 pt-2">
            <span className="text-[16px] font-semibold text-[#454545] capitalize">
              {paymentMethod === 'localBank' ? 'Local Bank' : paymentMethod} -
            </span>

            {paymentMethod === 'localBank' ? <><p>{paymentNumber}</p></> : <a
              target="_blank"
              href={paymentURL}
              className="text-[#0075FF]"
              rel="noopener noreferrer"
            >
              {paymentURL}
            </a>}

          </div>
          <div className="pt-8">
            <ApplyButton
              className="bg-primary hover:bg-[#FF0032] border-0 text-white"
              onClick={() => router.push(`/dashboard/marketplace/update/${id}`)}
            >
              Edit Application
            </ApplyButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
