import React from 'react';

const FullPageLoader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-[65vh] mt-5">
            <div id="fullPageLoader"></div>
        </div>
    );
};

export default FullPageLoader;