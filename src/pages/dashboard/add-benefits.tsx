import IsAdmin from '@components/IsAdmin';
import AddBenefits from '@views/AddBenefits';
import React from 'react';

function AddBenefitsPage() {
  return <IsAdmin>
    <AddBenefits />
  </IsAdmin>;
}

export default AddBenefitsPage