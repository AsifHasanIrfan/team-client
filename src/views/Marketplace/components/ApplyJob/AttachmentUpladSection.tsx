import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImAttachment } from 'react-icons/im';
import { IoIosClose } from 'react-icons/io';

type PropsTypes = {
  getAttachment: any;
  appliedAttachment?: any;
};

const AttachmentUpladSection = ({
  getAttachment,
  appliedAttachment,
}: PropsTypes) => {
  const [file, setFile] = useState<File[]>([]);
  const [newFile, setNewFile] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setNewFile((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  function removeAttachment(index: number) {
    setFile((prev) => prev.filter((_, i) => index !== i));
  }

  function removeNewAttachment(index: number) {
    setNewFile((prev) => prev.filter((_, i) => index !== i));
  }

  useEffect(() => {
    getAttachment(newFile);
  }, [newFile]);

  useEffect(() => {
    setFile(appliedAttachment);
  }, [appliedAttachment]);

  return (
    <div className="pb-[40px]">
      <div>
        <span className="font-[500] text-[18px]">Attachment</span>
        <span className="text-[#949494]">
          {' '}
          (upload resumes, portfolio pieces, etc)
        </span>
      </div>
      <div
        {...getRootProps()}
        className="bg-[#E0E0E0] py-[16px] text-center border border-[#E0E0E0] rounded-[8px] my-[20px]"
      >
        <p className="text-[16px] font-[500]">
          Drag & drop your or{' '}
          <button
            type="button"
            className="text-primary underline hover:text-lightHover"
          >
            Click here to upload
          </button>
          <input {...getInputProps()} />
        </p>
      </div>
      <ul className="space-y-1 w-max">
        {file?.map(({ name }, i) => {
          return (
            <li key={i} className="flex items-start select-none w-max">
              <div className="text-[16px] leading-[22px] text-[#0075FF] gap-[5px] flex items-center mb-[8px]">
                <ImAttachment fontSize={18} />
                <p>{name}</p>
              </div>
              <span
                onClick={() => removeAttachment(i)}
                className="text-[#0075FF] text-lg cursor-pointer"
              >
                <IoIosClose fontSize={25} />
              </span>
            </li>
          );
        })}
        {newFile?.map(({ name }, i) => {
          return (
            <li key={i} className="flex items-start select-none w-max">
              <div className="text-[16px] leading-[22px] text-[#0075FF] gap-[5px] flex items-center mb-[8px]">
                <ImAttachment fontSize={18} />
                <p>{name}</p>
              </div>
              <span
                onClick={() => removeNewAttachment(i)}
                className="text-[#0075FF] text-lg cursor-pointer"
              >
                <IoIosClose fontSize={25} />
              </span>
            </li>
          );
        })}
      </ul>
      <p>File size should be less than 50 MB</p>
    </div>
  );
};

export default AttachmentUpladSection;
