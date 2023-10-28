import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useBenefitHistory from '@hooks/useBenefitHistory';
import useBenefits from '@hooks/useBenefits';
import { useAppSelector } from '@hooks/useRedux';
import { useEffect, useState } from 'react';
import AssignBenefitModal from './components/AssignBenefitModal';
import BenefitCard from './components/BenefitCard/BenefitCard';
import BenefitHeader from './components/BenefitHeader';
import PurchaseHistory from './components/BenefitPurchaseHistory/PurchaseHistory';
import CreateBenefitModal from './components/CreateBenefitModal';
import SearchBenefits from './partials/SearchBenefits/SearchBenefits';

function AddBenefits() {
  // states
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filterTabValue, setFilterTabValue] = useState('');
  const [filteredBenefits, setFilteredBenefits] = useState<any>([]);
  const [searchByTitle, setSearchByTitle] = useState('');
  const [countPurchased, setCountPurchased] = useState(0);

  // global states
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { benefits, benefitsLoading } = useBenefits(auth.token);
  const { benefitHistories, benefitHistoriesLoading, benefitHistoriesFetch } = useBenefitHistory(auth?.token);

  useEffect(() => {
    const currentBenefitHistory = benefitHistories?.datas?.filter(
      (benefitHistory: any) => benefitHistory.current === true
    );
    setCountPurchased(currentBenefitHistory?.length)
  }, [benefitHistories?.datas])

  useEffect(() => {
    if (filterTabValue === 'archived') {
      const archivedBenefits = benefits?.datas?.filter(
        (benefit: any) => benefit.isArchived == false
      );

      if (searchByTitle) {
        setFilteredBenefits(
          archivedBenefits?.filter((el: any) =>
            el.title
              .toLowerCase()
              .match(new RegExp(searchByTitle.toLowerCase(), 'i'))
          )
        );
      } else {
        setFilteredBenefits(archivedBenefits);
      }
    } else if (filterTabValue === '') {
      const activeBenefits = benefits?.datas?.filter(
        (benefit: any) => benefit.isArchived == true
      );

      if (searchByTitle) {
        setFilteredBenefits(
          activeBenefits?.filter((el: any) =>
            el.title
              .toLowerCase()
              .match(new RegExp(searchByTitle.toLowerCase(), 'i'))
          )
        );
      } else {
        setFilteredBenefits(activeBenefits);
      }
    } else if (filterTabValue === 'assigned') {
      const assignedBenefits = benefits?.datas?.filter(
        (benefit: any) => benefit.users.length > 0
      );
      
      if (searchByTitle) {
        setFilteredBenefits(
          assignedBenefits?.filter((el: any) =>
            el.title
              .toLowerCase()
              .match(new RegExp(searchByTitle.toLowerCase(), 'i'))
          )
        );
      } else {
        setFilteredBenefits(assignedBenefits);
      }
    }
  }, [filterTabValue, benefits?.datas, searchByTitle]);

  // if no token & api fetching loading will go on
  if (!auth.token || benefitsLoading) return <FullPageLoader />;

  return (
    <>
      <SearchBenefits setSearchByTitle={setSearchByTitle} />
      <div className="bg-white rounded-[10px] p-[20px] lg:p-[30px]">
        <BenefitHeader
          setAssignModalOpen={setAssignModalOpen}
          setCreateModalOpen={setCreateModalOpen}
          filterTabValue={filterTabValue}
          setFilterTabValue={setFilterTabValue}
          countPurchased={countPurchased}
        />

        <AssignBenefitModal
          assignModalOpen={assignModalOpen}
          setAssignModalOpen={setAssignModalOpen}
          token={auth?.token}
        />

        <CreateBenefitModal
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
          token={auth?.token}
        />

        {filterTabValue !== 'purchase' && (
          <div>
            {filteredBenefits <= 0 ? (
              <h2 className="text-lg text-center mt-8">
                There are no benefits
              </h2>
            ) : (
              <BenefitCard benefits={filteredBenefits} />
            )}
          </div>
        )}

        {filterTabValue === 'purchase' && <PurchaseHistory />}

        {/* <BenefitsTable token={auth?.token} /> */}
      </div>
    </>
  );
}

export default AddBenefits;
