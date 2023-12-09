import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface AlertModalProps {
    type: string;
    message: string;
    onClose: () => void;
}

const AlertModal: FC<AlertModalProps> = ({ type, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className="alert-overlay">
            <div className={`alert-modal alert-modal_${type}`}>
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <div className="alert-content">
                    <p>{message}</p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AlertModal;
