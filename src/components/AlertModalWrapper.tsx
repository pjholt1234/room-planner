import AlertModal from './AlertModal';
import { useEffect, useState } from 'react';

const AlertModalWrapper = () => {
    const [alertData, setAlertData] = useState<{
        type: string;
        message: string;
    } | null>(null);

    useEffect(() => {
        const handleCustomAlert = (event: CustomEvent) => {
            setAlertData({
                type: event.detail.type,
                message: event.detail.message
            });
        };

        document.addEventListener('alert', (event: any) =>
            handleCustomAlert(event)
        );

        return () => {
            document.removeEventListener('alert', (event: any) =>
                handleCustomAlert(event)
            );
        };
    }, []);

    const handleCloseAlert = () => {
        setAlertData(null);
    };

    return (
        <>
            {alertData && (
                <AlertModal
                    type={alertData.type}
                    message={alertData.message}
                    onClose={handleCloseAlert}
                />
            )}
        </>
    );
};

export default AlertModalWrapper;
