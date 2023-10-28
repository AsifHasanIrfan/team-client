import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import { cx } from '@config/constants';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import CircularProgress from '@components/CircularProgress';
import Select from 'react-select';
import AgreeModal from './AgreeModal';

type Props = {}

// select style
const style = {
    control: (base: any, state: any) => ({
        ...base,
        boxShadow: state.isFocused ? 0 : 0,
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        padding: '16px 15px',
        cursor: 'pointer',
        borderBottom: '1px solid #E9EBEB',
        backgroundColor: state.isSelected ? '#C10206' : 'transparent',
        color: state.isSelected ? 'white' : 'initial',
        '&:hover': {
            backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
            color: state.isSelected ? 'white' : 'initial',
        },
    }),
};

const options = [
    {
        title: 'Select',
        value: ''
    },
    {
        title: 'Current Team Member',
        value: 'Current Team Member'
    },
    {
        title: 'Old Team Member',
        value: 'Old Team Member'
    },
]


const RequestSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .email('Enter valid email')
        .required('Required'),
});

const RequestLeftBody = (props: Props) => {

    const router = useRouter();

    // states
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>(options[0]);
    const [data, setData] = useState({ name: '', email: '', requestedBy: '' })

    useEffect(() => {
        if (selectedOption.value) {
            setError(false)
        }
    }, [selectedOption.value])

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    requestedBy: '',
                }}
                validationSchema={RequestSchema}
                onSubmit={(values) => {

                    if (selectedOption.value === '') {
                        setError(true);
                        return;
                    }

                    setData({ ...data, name: values.name, email: values.email, requestedBy: selectedOption.value })
                    setOpen(true);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="rounded-lg flex flex-col md:ml-auto mt-5 md:mt-0 ">
                            <div className=" mb-5">
                                <div className="mb-3">
                                    <label htmlFor="name" className="leading-7 text-2xl ">
                                        Name
                                    </label>
                                </div>
                                <Field
                                    placeholder="Enter your name"
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={cx(
                                        errors.name && touched.name && 'border border-[red]',
                                        'w-full text-base bg-white rounded border border-[#dddddd]  outline-none text-gray-700  py-4 px-5 leading-8 transition-colors duration-200 ease-in-out'
                                    )}
                                />
                                {errors.name && touched.name ? (
                                    <div className="ml-1.5 mt-1.5 text-[red]">
                                        {errors.name}
                                    </div>
                                ) : null}
                            </div>

                            <div className=" mb-5">
                                <div className="mb-3">
                                    <label htmlFor="email" className="leading-7 text-2xl ">
                                        Email
                                    </label>
                                </div>
                                <Field
                                    placeholder="Enter your email"
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={cx(
                                        errors.email && touched.email && 'border border-[red]',
                                        'w-full text-base bg-white rounded border border-[#dddddd]  outline-none text-gray-700  py-4 px-5 leading-8 transition-colors duration-200 ease-in-out'
                                    )}
                                />
                                {errors.email && touched.email ? (
                                    <div className="ml-1.5 mt-1.5 text-[red]">
                                        {errors.email}
                                    </div>
                                ) : null}
                            </div>

                            <div className=" mb-5">
                                <div className="mb-3">
                                    <label htmlFor="email" className="leading-7 text-2xl ">
                                        Member Type
                                    </label>
                                </div>
                                <Select
                                    defaultValue={options[0]}
                                    className="rs-custom"
                                    classNamePrefix="rs-custom"
                                    styles={style}
                                    value={selectedOption}
                                    isSearchable={false}
                                    onChange={(option: any) => {
                                        setSelectedOption(option);
                                    }}
                                    options={options}
                                    // name="requestedBy"
                                    // instanceId={useId()}
                                    formatOptionLabel={({ title }: { title: string }) => <>{title}</>}
                                />
                                {error ? (
                                    <div className="ml-1.5 mt-1.5 text-[red]">
                                        Required
                                    </div>
                                ) : null}
                            </div>

                            <button
                                type="submit"
                                className={`text-white bg-secondary relative border-0 py-5 px-8 focus:outline-none rounded text-base hover:bg-primary transition ease-in-out duration-300 ${loading && 'bg-primary flex justify-center items-center'}`}
                                disabled={loading}
                            >
                                {loading ?
                                    <><CircularProgress size={22} /> <span className='ml-2'>Requesting</span></>
                                    : 'Request'}
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push('/login')}
                                className={`text-white bg-secondary relative border-0 py-5 px-8 focus:outline-none rounded text-base mt-4 hover:bg-primary transition ease-in-out duration-300`}
                            >
                                Back To Login
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <AgreeModal
                data={data}
                open={open}
                setOpen={setOpen}
                isOldMember={selectedOption.value === 'Old Team Member' ? true : false}
            />

        </>
    )
}

export default RequestLeftBody