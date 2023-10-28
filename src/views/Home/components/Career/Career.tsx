import useJobs from '@hooks/useJobs';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import CareerCard from './components/CareerCard';
import CareerOptions from './components/CareerOptions';
import CareerTitle from './components/CareerTitle';

const Career = () => {
  // hooks
  const { jobs, jobsLoading } = useJobs('');

  // states
  const [openTab, setOpenTab] = useState<string>('Designer');
  const [filterData, setFlterData] = useState([]);

  // filter data
  useEffect(() => {
    if (jobs?.datas.length > 0) {
      setFlterData(
        jobs?.datas.filter(
          (item: any) =>
            item.category.toLowerCase() === openTab.toLowerCase() &&
            item.status === 'active'
        )
      );
    } else {
      setFlterData(jobs?.datas);
    }
  }, [jobs?.datas, openTab]);

  useEffect(() => {
    let tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.__careerSection',
        start: 'top 75%',
      },
    });

    tl1.to('.__careerOptionsGsap', {
      opacity: 1,
      y: 0,
      duration: 0.3,
    });

    tl1.to(
      '.__careerCardParent',
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      '-=.2'
    );
  }, []);

  // loader
  // if (jobsLoading) return <FullPageLoader />;

  return (
    <section className="bg-[#F7F8FA]">
      <div className="container md:py-[80px] pt-[60px] pb-0">
        <CareerTitle />

        <div className="__careerSection">
          <CareerOptions openTab={openTab} setOpenTab={setOpenTab} />

          <div className="__careerCardParent opacity-0 translate-y-32">
            <h4 className="mt-[50px] mb-[20px] font-semibold font-2xl">
              {openTab}
            </h4>

            {filterData?.length > 0 ? (
              filterData?.map((item: any) => (
                <React.Fragment key={item._id}>
                  <CareerCard classNameGsap data={item} />
                </React.Fragment>
              ))
            ) : (
              <p className="text-center mt-10 text-red">No available jobs</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
