import { applicationInfo } from '@state/index'
import { useAtom } from 'jotai'

export const useApplicationInfo = () => {
    const [applicationData, setApplicationData] = useAtom(applicationInfo)

    const updateApplicationData = (key: string, value: any) => {
        setApplicationData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return {
        applicationData,
        setApplicationData,
        updateApplicationData
    }
}