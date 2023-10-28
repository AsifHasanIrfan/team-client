import Button from '@components/Button';
import UploadIcon from '@components/Icons/Actions/UploadIcon';
import Input from '@components/Input';
import Modal from '@components/Modal';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { uploadFiles } from '@utils/uploadFile';
import useBenefits from '@hooks/useBenefits';
import useBenefitsUser from '@hooks/useBenefitsUser';

type Props = {
  createModalOpen: boolean;
  setCreateModalOpen: (createModalOpen: boolean) => void;
  token: string;
}

const CreateBenefitModal = ({ createModalOpen, setCreateModalOpen, token }: Props) => {
  const [inputValue, setInputValue] = useState<any>({
    benefitAvatar: [],
    title: '',
    subDescription: '',
    description: '',
    dgCost: 0,
  });
  const [imgSrc, setImgSrc] = useState<any>();
  const [imgUploadError, setImgUploadError] = useState({ img: '' });
  const [loading, setLoading] = useState(false);

  // hooks
  const { benefitsFetch } = useBenefits(token);
  const { benefitsUsersFetch } = useBenefitsUser(token);

  const handleCreateBenefit = async (e: any) => {
    e.preventDefault();
    const benefitData = {
      imgUrl: '',
      title: inputValue.title,
      description: inputValue.description,
      subDescription: inputValue.subDescription,
      dgCost: inputValue.dgCost,
      isArchived: true
    };
    setLoading(true);
    // check image upload
    if (inputValue.benefitAvatar.length === 0) {
      toast.error('Please upload an image!');
      setLoading(false);
      return;
    } else {
      const res = await uploadFiles(inputValue.benefitAvatar);
      benefitData.imgUrl = res[0].url
    }

    axios
      .post(`${process.env.serverUrl}benefit`, benefitData, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setCreateModalOpen(false);
        setInputValue({
          benefitAvatar: [],
          title: '',
          description: '',
          dgCost: 0,
        });
        setImgSrc('');
        if (response.data.success === false) {
          return toast.error(response.data.message);
        }
        if (response.data.success === true) {
          benefitsFetch();
          benefitsUsersFetch();
          toast.success(response.data.message);
        }
      });
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

  // onchange handler
  let onChange = (e: any): void => {
    setInputValue((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal setOpen={setCreateModalOpen} open={createModalOpen} title={'Create Benefit'}>
      <div className="w-[330px] md:w-[500px] xl:w-[850px] benefit__createModal">
        <form onSubmit={handleCreateBenefit}>
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
                  <span>Choose a file&hellip;</span>
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
              rows={5}
              onChange={onChange}
              value={inputValue.description}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-5">
            <Input
              label={`DG cost to unlock`}
              placeholder={`DG cost`}
              type={`number`}
              isRequired={true}
              name="dgCost"
              onChange={onChange}
              value={inputValue.dgCost}
            />
          </div>

          <div className="flex justify-end">
            <div className={`md:w-[200px] w-full h-[50px] mt-[15px] self-end`}>
              <Button
                rounded="md"
                className={`w-full h-full !text-sm !px-[15px]`}
                disabled={loading}
                loading={loading}
                loadingText={'Creating'}
              >
                Create
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default CreateBenefitModal;