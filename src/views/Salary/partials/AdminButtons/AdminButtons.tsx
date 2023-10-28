import Button from '@components/Button';
import React from 'react'

type Props = {
    isAdmin: boolean;
    setOpen: any;
    setCoversionOpen: any;
}

const AdminButtons = ({ isAdmin, setOpen, setCoversionOpen }: Props) => {
    return (<>
        {isAdmin && (<div className="flex justify-end gap-4">

            <Button
                rounded="md"
                className="mb-4"
                onClick={() => setCoversionOpen(true)}
            >
                Conversion
            </Button>

            <Button
                rounded="md"
                className="mb-4"
                onClick={() => setOpen(true)}>
                Create salary
            </Button>

        </div>
        )}
    </>
    )
}

export default AdminButtons