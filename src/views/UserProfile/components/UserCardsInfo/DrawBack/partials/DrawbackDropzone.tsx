import Button from '@components/Button';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImAttachment } from 'react-icons/im';
import { IoIosClose } from 'react-icons/io';

export default function DrawbackDropzone({ setFiles, file, setFile }: any) {
  const onDrop = useCallback((acceptedFiles: any) => {
    setFile((prev: any) => [...prev, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function removeAttachment(index: number) {
    setFile((prev: any) => prev.filter((_: any, i: any) => index !== i));
  }

  useEffect(() => {
    setFiles(file);
  }, [file]);

  return (
    <>
      <ul className="space-y-1">
        {file?.map(({ name }: any, i: any) => {
          return (
            <li
              key={i}
              className="flex items-start select-none"
              onClick={() => removeAttachment(i)}
            >
              <div className="text-[16px] leading-[22px] text-[#0075FF] cursor-pointer gap-[5px] flex items-center mb-[8px]">
                <ImAttachment fontSize={18} />
                <p>{name}</p>
              </div>
              <button className="text-[#0075FF] text-lg">
                <IoIosClose />
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
