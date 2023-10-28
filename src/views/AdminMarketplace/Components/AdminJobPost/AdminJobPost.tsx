import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useProjects from '@hooks/useProjects';
import { useAppSelector } from '@hooks/useRedux';
import { useState, useEffect } from 'react';
import JobPostHeader from '../JobPostHeader/JobPostHeader';
import ProjectTable from '../ProjectTable/ProjectTable';

const AdminJobPost = () => {

  // hooks & global states
  const { auth } = useAppSelector((state) => state);
  const { projects, projectsLoading } = useProjects(auth?.token, []);

  // states
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState('Posted Projects');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (tabValue === 'Posted Projects') {
      setFilterData(projects?.datas?.filter((item: any) => item.status === 'posted'))
    } else if (tabValue === 'Running Projects') {
      setFilterData(projects?.datas?.filter((item: any) => item.status === 'running'))
    } else if (tabValue === 'Archived Projects') {
      setFilterData(projects?.datas?.filter((item: any) => item.status === 'archived'))
    } else {
      setFilterData([])
    }
  }, [tabValue, projects?.datas])

  // loader
  if (!auth.token) return <FullPageLoader />

  return (
    <>
      <JobPostHeader
        setCreateProjectModalOpen={setCreateProjectModalOpen}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />
      <div className="mt-12">
        <ProjectTable
          data={filterData}
          loading={projectsLoading}
          tabValue={tabValue}
          token={auth?.token}
        />
      </div>
    </>
  );
};

export default AdminJobPost;
