import Button from '@components/Button';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImAttachment } from 'react-icons/im';
import { IoIosClose } from 'react-icons/io';

export default function MyDropzone({ setFiles }: any) {
  const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile((prev) => [...prev, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function removeAttachment(index: number) {
    setFile((prev) => prev.filter((_, i) => index !== i));
  }

  useEffect(() => {
    setFiles(file)
  }, [file])

  return (
    <>
      <ul className="space-y-1 w-max">
        {file?.map(({ name }, i) => {
          return (
            <li key={i} className="flex items-start select-none w-max">
              <div className="text-[16px] leading-[22px] text-[#0075FF] gap-[5px] flex items-center mb-[8px]">
                <ImAttachment fontSize={18} />
                <p>{name}</p>
              </div>
              <button
                onClick={() => removeAttachment(i)}
                className="text-[#0075FF] text-lg"
              >
                <IoIosClose fontSize={25} />
              </button>
            </li>
          );
        })}
      </ul>
      <div {...getRootProps()} className="w-max">
        <input {...getInputProps()} />

        <Button rounded="md" type="button">
          {isDragActive
            ? 'Drop file here'
            : file?.length > 1
            ? 'Add more'
            : 'Add attachment..'}
        </Button>
      </div>
    </>
  );
}
