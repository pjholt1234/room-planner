import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    className?: string;
    children: ReactNode;
    hidden?: boolean;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({
    className,
    children,
    hidden = false,
    onClose
}) => {
    //@ts-ignore
    const [isHidden, setIsHidden] = useState<boolean>(hidden);
    const hiddenClass = isHidden ? 'modal__hidden' : '';

    useEffect(() => {
        setIsHidden(hidden);
    }, [hidden]);

    const setClosed = () => {
        setIsHidden(true);
        onClose();
    };

    return createPortal(
        <div className={`modal ${hiddenClass}`}>
            <div className={`modal-content ${className}`}>
                <div className="modal-header">
                    <button className="close" onClick={() => setClosed()}>
                        &times;
                    </button>
                </div>
                {children}
            </div>
            <div className="modal-background"></div>
        </div>,
        document.body
    );
};

export default Modal;
