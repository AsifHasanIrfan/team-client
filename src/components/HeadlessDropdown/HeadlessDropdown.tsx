import React, { Fragment } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { Popover, Transition } from "@headlessui/react";

type HeadlessDropdown = {
    children?: React.ReactNode,
}

const HeadlessDropdown: React.FC<HeadlessDropdown> = ({ children }) => {
    return (
        <div>
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button>
                            <BsThreeDotsVertical />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className={`absolute z-[1000] right-0`}>
                                <div onClick={() => close()} >
                                    {children}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}

export default HeadlessDropdown