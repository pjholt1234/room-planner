import Modal from './Modal';
import { useEffect, useState } from 'react';
import PlanManager from '../data-access/PlanManager';

const DeletePlanModal = () => {
    const [planId, setPlanId] = useState<string>('');
    const [hidden, setHidden] = useState<boolean>(true);

    const planManager = PlanManager.getInstance();

    useEffect(() => {
        const observer = () => {
            setHidden(false);
            setPlanId(planManager.getPlanId());
        };

        planManager.addDeleteObserver(observer);

        return () => {
            planManager.removeDeleteObserver(observer);
        };
    }, []);

    const handleDeletePlan = () => {
        console.log('deleting plan', planId);
        if (!planId) {
            return;
        }

        planManager.deletePlan();
        setHidden(true);
    };

    return (
        <Modal
            hidden={hidden}
            onClose={() => setHidden(true)}
            className="modal-content_save-plan"
        >
            <h3>
                Are you sure you want to delete {planManager.getPlanName()}?
            </h3>
            <div className="container_flex">
                <button
                    className="button button-square"
                    onClick={() => setHidden(true)}
                >
                    Cancel
                </button>
                <button
                    className="button button-square"
                    onClick={handleDeletePlan}
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
};

export default DeletePlanModal;
