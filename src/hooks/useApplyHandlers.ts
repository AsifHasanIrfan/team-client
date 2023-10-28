import { useAtom } from 'jotai';

import { applicationInfo } from './../state/index';
import { screenAtom } from './../views/Apply/Apply';

export function useApplyHandlers() {
    const [finalData, setFinaldata] = useAtom(applicationInfo)
    const [activeScreen, setActiveScreen] = useAtom(screenAtom)

    function handleNext() {
        if (activeScreen === 7) return;
        setActiveScreen(activeScreen + 1)
    }

    function handlePrev() {
        if (activeScreen === 1) return
        setActiveScreen(activeScreen - 1)
    }

    function handleSubmit() {
        setActiveScreen(8)
    }


    return { handlePrev, handleNext, handleSubmit }
}