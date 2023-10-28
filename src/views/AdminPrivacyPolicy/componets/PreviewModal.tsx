import Modal from '@components/Modal'
import React from 'react'
import parse from 'html-react-parser';

type Props = {}

const PreviewModal = ({ content, open, setOpen }: any) => {
    return (
        <>
            <Modal open={open} setOpen={setOpen} title={'Privacy & Policy'}>
                <div
                    className={`md:w-[650px] bg-white z-50 rounded-[10px] md:p-[15px] lg:px-[15x] md:pt-0 p-0 `}
                >
                    <div className={`bg-white relative md:max-h-[60vh] max-h-[75vh]`}>
                        <div className='mt-5 md:max-h-[55vh] max-h-[65vh] overflow-y-scroll black__scrolbar basic-change pl-10'>
                            {parse(content ? content : '')}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PreviewModal