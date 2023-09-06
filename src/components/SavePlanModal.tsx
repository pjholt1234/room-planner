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

        planManager.addObserver('save', observer);

        return () => {
            planManager.removeObserver('save', observer);
        };
    }, []);

    const handleSavePlan = () => {
        if (!planName) {
            setMessage('Name cannot be empty');
            return;
        }

        planManager.setPlanName(planName);
        planManager.notifyObservers('saving');
        setHidden(true);
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
            className="modal-content"
        >
            <div className="modal-body">
                <div className="container_flex container_full-width">
                    <p>Save plan as..</p>
                    <input
                        id="plan-input"
                        className="input__text input__text--save-plan"
                        type="planName"
                        value={planName}
                        onChange={handleInputChange}
                    />
                </div>
                <p className="modal-content_save-plan_message">{message}</p>
            </div>

            <div className="modal-footer">
                <div className="modal-content__button-container">
                    <button
                        className="button button-square button-square--wide"
                        onClick={() => setHidden(true)}
                    >
                        Cancel
                    </button>
                    <button
                        className="button button-square button-square--wide button-square--success "
                        onClick={handleSavePlan}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default SavePlanModal;
