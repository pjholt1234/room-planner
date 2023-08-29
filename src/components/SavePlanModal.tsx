import Modal from './Modal';
import { ChangeEvent, FC, useState } from 'react';

interface SavePlanModalProp {
    showModal: boolean;
    onSubmit: (name: string) => void;
    onClose: () => void;
}

const SavePlanModal: FC<SavePlanModalProp> = ({
    showModal = false,
    onSubmit,
    onClose
}) => {
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSavePlan = () => {
        if (name !== '') {
            onSubmit(name);
            onClose();

            return;
        }
        setMessage('Name cannot be empty');
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) setName('');

        setName(event.target.value);
    };

    return (
        <Modal
            hidden={!showModal}
            className="modal-content_save-plan"
            onClose={onClose}
        >
            <h3>Enter plan name</h3>
            <div className="container_flex">
                <input
                    id="plan-input"
                    className="input__text"
                    type="text"
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
