import IsAdmin from '@components/IsAdmin';
import PostNewJob from '@views/PostNewJob';
import React from 'react';

function PostNewProject() {
  return (
    <IsAdmin>
      <PostNewJob />
    </IsAdmin>
  );
}

export default PostNewProject;
