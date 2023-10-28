import { useAtom } from 'jotai';

import { internshipInfo } from '../state/index';
import { screenAtom } from '../views/InternshipApply';

export function useInternshipApplyHandlers() {
  const [finalData, setFinaldata] = useAtom(internshipInfo);
  const [activeScreen, setActiveScreen] = useAtom(screenAtom);

  function handleNext() {
    if (activeScreen === 7) return;
    setActiveScreen(activeScreen + 1);
  }

  function handlePrev() {
    if (activeScreen === 1) return;
    setActiveScreen(activeScreen - 1);
  }

  function handleSubmit() {
    setActiveScreen(8);
  }

  return { handlePrev, handleNext, handleSubmit };
}
