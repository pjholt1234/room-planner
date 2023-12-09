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

        planManager.addObserver('delete', observer);

        return () => {
            planManager.removeObserver('delete', observer);
        };
    }, []);

    const handleDeletePlan = () => {
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
            className="modal-content"
        >
            <div className="modal-body">
                <p>
                    Are you sure you want to delete{' '}
                    <b>"{planManager.getPlanName()}</b>
                    "?
                </p>
            </div>
            <div className="modal-footer">
                <div className="modal-content__button-container">
                    <button
                        className="button button-square"
                        onClick={() => setHidden(true)}
                    >
                        Cancel
                    </button>
                    <button
                        className="button button-square button-square--danger"
                        onClick={handleDeletePlan}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeletePlanModal;
