import useMarketplace from '@hooks/useMarketplace';
import { useAppSelector } from '@hooks/useRedux';
import { useEffect, useState } from 'react';
import { getData } from '../../../../utils/fetchData';
import ProjectEditForm from './ProjectEditForm';

const EditProject = ({ routerDetails }: any) => {
  // globals
  const { projectId } = routerDetails.query;
  const { auth } = useAppSelector((state) => state);

  const { marketplace, marketplaceFetch } = useMarketplace(auth?.token, projectId);

  useEffect(() => {
    if (projectId !== null) {
      marketplaceFetch();
    }
  }, [projectId, auth?.token]);

  return (
    <>
      <ProjectEditForm projectData={marketplace?.data} token={auth?.token} />
    </>
  );
};

export default EditProject;
