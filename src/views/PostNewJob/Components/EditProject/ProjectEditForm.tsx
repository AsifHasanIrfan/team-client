import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useApplyProjects from '@hooks/useApplyProjects';
import { uploadFiles } from '@utils/uploadFile';
import axios from 'axios';
import dayjs from 'dayjs';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { ImAttachment } from 'react-icons/im';
import { IoIosClose } from 'react-icons/io';
import { VscCalendar } from 'react-icons/vsc';
import * as Yup from 'yup';
import BidedTable from './BidedTable';

const ProjectEditForm = ({ projectData, token }: any) => {
  const router = useRouter();

  const { applyProjects, applyProjectsLoading } = useApplyProjects(token, `marketplaceId=${projectData?._id}`);

  // states
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File[]>([]);
  const [newFile, setNewFile] = useState<File[]>([]);
  const [datePick, setDatePick] = useState();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    jobTitle: '',
    budget: '',
    projectLength: '',
    DGCoin: '',
    jobCategories: '',
    description: '',
    jobStatus: '',
  });

  useEffect(() => {
    setInitialValues({
      jobTitle: projectData?.title,
      budget: projectData?.budget,
      projectLength: projectData?.length,
      DGCoin: projectData?.costOfCoin,
      jobCategories: projectData?.category,
      description: projectData?.description,
      jobStatus: projectData?.status,
    });
    //@ts-ignore
    setDatePick(dayjs(projectData?.expiredDate));
    setFile(projectData?.attachments);
  }, [projectData]);

  const dateRef = useDetectClickOutside({
    onTriggered: () => setDatePickerOpen(false),
  });

  const onDrop = useCallback((acceptedFiles: any) => {
    setNewFile((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const inputStyle =
    'border border-[#DADADA] focus:border-[#949494] outline-none rounded-lg bg-white px-5 py-3 placeholder:text-[#6D6D6D] w-full block mb-5';

  const ProjectSchema = Yup.object().shape({
    jobTitle: Yup.string().required('Please enter job title *'),
    budget: Yup.number().required('Please enter project budget *'),
    projectLength: Yup.string().required('Please enter project length *'),
    DGCoin: Yup.number().required('Please enter DG coin *'),
    jobCategories: Yup.string().required('Please select a job category*'),
    jobStatus: Yup.string().required('Please select job status *'),
    description: Yup.string().required('Please enter project description *'),
  });

  function removeAttachment(index: number) {
    setFile((prev) => prev.filter((_, i) => index !== i));
  }
  function removeNewAttachment(index: number) {
    setNewFile((prev) => prev.filter((_, i) => index !== i));
  }

  const onSubmit = async (value: any, { resetForm }: any) => {
    let attachments: any = [];
    setLoading(true);
    if (newFile.length > 0) {
      attachments = await uploadFiles(newFile);
    }

    const projectUpdateData = {
      title: value.jobTitle,
      description: value.description,
      category: value.jobCategories,
      status: value.jobStatus,
      length: value.projectLength,
      expiredDate: dayjs(datePick).format(),
      costOfCoin: value.DGCoin,
      budget: value.budget,
      attachments: [...file, ...attachments],
    };

    axios
      .patch(
        `${process.env.serverUrl}marketplace/update/${projectData._id}`,
        projectUpdateData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.success === false) {
          return toast.error(response.data.message);
        }
        if (response.data.success === true) {
          router.push('/dashboard/admin-marketplace');
          toast.success(response.data.message);
        }
      });
  };

  if (projectData === undefined) return <FullPageLoader />;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ProjectSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <div>
                <p className="font-semibold text-lg text-[#454545] mb-4">
                  Job Title
                </p>
                <Field
                  type="text"
                  placeholder="Job Title"
                  name="jobTitle"
                  className={`${inputStyle} ${
                    errors.jobTitle && touched.jobTitle && '!border-[red]'
                  }`}
                />
                {errors.jobTitle && touched.jobTitle ? (
                  <div className="!my-3 text-[red]">{errors.jobTitle}</div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[30px]">
              <div>
                <p className="font-semibold text-lg text-[#454545] mb-4">
                  Job Categories
                </p>
                <Field
                  as="select"
                  type="text"
                  name="jobCategories"
                  className={`${inputStyle} pl-3 ${
                    errors.jobCategories &&
                    touched.jobCategories &&
                    '!border-[red]'
                  }`}
                >
                  <option value="">Select job category</option>
                  <option value="uiux">UI/UX design</option>
                  <option value="react">React.js</option>
                  <option value="wordpress">Wordpress</option>
                  <option value="fullstack">Full-Stack Dev</option>
                  <option value="graphic">Graphic design</option>
                  <option value="social">Social Media</option>
                  <option value="other">Other</option>
                </Field>
                {errors.jobCategories && touched.jobCategories ? (
                  <div className="!my-3 text-[red]">{errors.jobCategories}</div>
                ) : null}
              </div>
              <div>
                <p className="font-semibold text-lg text-[#454545] mb-4">
                  Status
                </p>
                <Field
                  as="select"
                  type="text"
                  name="jobStatus"
                  className={`${inputStyle} pl-3 ${
                    errors.jobStatus && touched.jobStatus && '!border-[red]'
                  }`}
                >
                  <option value="">Select Status</option>
                  <option value="posted">Posted</option>
                  <option value="running">Running</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="archived">Archived</option>
                </Field>
                {errors.jobStatus && touched.jobStatus ? (
                  <div className="!my-3 text-[red]">{errors.jobStatus}</div>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[30px]">
              <div>
                <p className="font-semibold text-lg text-[#454545] mb-4">
                  Project Budget
                </p>
                <Field
                  type="number"
                  placeholder="$100"
                  name="budget"
                  className={`${inputStyle} ${
                    errors.budget && touched.budget && '!border-[red]'
                  }`}
                />
                {errors.budget && touched.budget ? (
                  <div className="!my-3 text-[red]">{errors.budget}</div>
                ) : null}
              </div>
              <div>
                <p className="font-semibold text-lg text-[#454545] mb-4">
                  Project Length
                </p>
                <Field
                  type="text"
                  placeholder="30 days"
                  name="projectLength"
                  className={`${inputStyle} ${
                    errors.projectLength &&
                    touched.projectLength &&
                    '!border-[red]'
                  }`}
                />
                {errors.projectLength && touched.projectLength ? (
                  <div className="!my-3 text-[red]">{errors.projectLength}</div>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[30px]">
              <div>
                <p className="font-semibold text-lg text-[#454545] mb-4">
                  Job Expire
                </p>
                <div
                  onClick={() => setDatePickerOpen(true)}
                  ref={dateRef}
                  className={`${inputStyle} achievement-datepicker relative flex items-center justify-between cursor-pointer`}
                >
                  <p>{dayjs(datePick).format('MMM DD, YYYY')}</p>
                  {datePickerOpen && (
                    <Field
                      type="text"
                      as={DatePicker}
                      selectedDate={datePick}
                      onChange={setDatePick}
                      placeholder="$100"
                      name="expireDate"
                      value={datePick}
                    />
                  )}
                  <VscCalendar className="ml-5" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-lg text-[#454545] mb-4">
                  Apply Now - DG Coins
                </p>
                <Field
                  type="number"
                  placeholder="Amount of DG coin"
                  name="DGCoin"
                  className={`${inputStyle} ${
                    errors.DGCoin && touched.DGCoin && '!border-[red]'
                  }`}
                />
                {errors.DGCoin && touched.DGCoin ? (
                  <div className="!my-3 text-[red]">{errors.DGCoin}</div>
                ) : null}
              </div>
            </div>

            <div>
              <p className="font-semibold text-lg text-[#454545] mb-4">
                Project Attachments
              </p>

              <div className="border border-[rgba(218,218,218,0.25)] focus:border-[#949494] outline-none rounded-lg bg-[#FDFDFD] px-5 py-3 placeholder:text-[#6D6D6D] w-full mb-5 flex justify-center">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-base w-max hidden md:block">
                    Drag & drop or
                  </p>
                  <div {...getRootProps()} className="cursor-pointer">
                    <input {...getInputProps()} />
                    <span className="font-semibold text-base text-primary hover:text-red transition-all duration-300 hidden md:block underline">
                      Click here to upload
                    </span>
                    <span className="font-semibold text-base text-primary hover:text-red transition-all duration-300 block md:hidden">
                      Browse file to upload
                    </span>
                  </div>
                </div>
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
            </div>

            <div>
              <p className="font-semibold text-lg text-[#454545] mb-4">
                Description
              </p>
              <Field
                as="textarea"
                type="text"
                name="description"
                placeholder="Type here ......"
                rows={8}
                className={`${inputStyle} ${
                  errors.description && touched.description && '!border-[red]'
                }`}
              />
              {errors.description && touched.description ? (
                <div className="!my-3 text-[red]">{errors.description}</div>
              ) : null}
            </div>

            <div className="py-2">
              <BidedTable
                applyProjects={applyProjects}
                applyProjectsLoading={applyProjectsLoading}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10 mt-12 w-full lg:w-auto h-full">
              <span
                className="font-semibold cursor-pointer md:ml-auto text-xl text-[#454545] hover:text-red transition-all duration-300 border-2 md:border-0 py-3 px-5 w-full md:w-max rounded-full flex justify-center hover:border-red order-2"
                onClick={() => router.push('/dashboard/admin-marketplace')}
              >
                Cancel
              </span>
              <Button
                type="submit"
                className="w-full md:w-max md:order-2"
                loadingText={'Updating'}
                loading={loading}
                disabled={loading}
              >
                Update Details
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProjectEditForm;
