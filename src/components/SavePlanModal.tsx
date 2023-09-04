import Modal from './Modal';
import { ChangeEvent, useEffect, useState } from 'react';
import PlanManager from '../data-access/PlanManager';

const SavePlanModal = () => {
    const [planName, setPlanName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [hidden, setHidden] = useState<boolean>(true);

    const planManager = PlanManager.getInstance();

    useEffect(() => {
        const observer = () => {
            setHidden(false);
            setPlanName(planManager.getPlanName());
        };

        planManager.addSaveObserver(observer);

        return () => {
            planManager.removeSaveObserver(observer);
        };
    }, []);

    const handleSavePlan = () => {
        if (!planName) {
            setMessage('Name cannot be empty');
            return;
        }

        planManager.setPlanName(planName);
        planManager.notifySavingObservers();
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) setPlanName('');
        setPlanName(event.target.value);
    };

    return (
        <Modal
            hidden={hidden}
            onClose={() => {
                setHidden(true);
            }}
            className="modal-content_save-plan"
        >
            <h3>Enter plan name</h3>
            <div className="container_flex">
                <input
                    id="plan-input"
                    className="input__text"
                    type="planName"
                    value={planName}
                    onChange={handleInputChange}
                />
                <button
                    className="button button-square"
                    onClick={handleSavePlan}
                >
                    Save
                </button>
            </div>
            <p className="modal-content_save-plan_message">{message}</p>
        </Modal>
    );
};

export default SavePlanModal;
