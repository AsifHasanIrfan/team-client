import Modal from '@components/Modal';
import React, { useState } from 'react';
import InternshipHeroSection from './components/InternshipHeroSection';
import InternshipMainSection from './components/InternshipMainSection';
import InternshipModal from './components/InternshipModal';

const Internship: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="xl:pt-[100px] pt-[50px] container">
        <InternshipHeroSection setIsOpen={setIsOpen} />
        <InternshipMainSection setIsOpen={setIsOpen} />
      </div>

      <Modal setOpen={() => setIsOpen((open) => !open)} open={isOpen}>
        <InternshipModal setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};
export default Internship;
