import React, { useState } from 'react';
import PostNewJobForm from '../PostNewJobForm/PostNewJobForm';
import PublishSuccess from '../PublishSuccess/PublishSuccess';

const PostNewJob = () => {
  // states
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  return (
    <>
      {!publishedSuccess ? (
        <PostNewJobForm setPublishedSuccess={setPublishedSuccess} />
      ) : (
        <PublishSuccess />
      )}
    </>
  );
};

export default PostNewJob;