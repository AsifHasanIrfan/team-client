import React, { useRef } from 'react'
import JoditEditor from 'jodit-react';

type Props = {}

const Editor = ({ value, setValue }: any) => {

    const editor = useRef(null);
    return (

        <JoditEditor
            ref={editor}
            value={value}
            onChange={(newContent: any) => setValue(newContent)}
        />
    )
}

export default Editor