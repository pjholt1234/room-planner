import { ReactNode } from 'react';

interface UpDownButtonProps {
    upOnClick: () => void;
    upContent: ReactNode;
    upDisabled: boolean;
    downOnClick: () => void;
    downContent: ReactNode;
    downDisabled: boolean;
}

const UpDownButton = ({
    upOnClick,
    upContent,
    upDisabled = false,
    downOnClick,
    downContent,
    downDisabled = false
}: UpDownButtonProps) => {
    const buttonUpDisabledClass = upDisabled ? 'button--disabled' : '';
    const buttonDownDisabledClass = downDisabled ? 'button--disabled' : '';

    return (
        <div>
            <button
                className={`button button-up-down button-up ${buttonUpDisabledClass}`}
                disabled={upDisabled}
                onClick={upOnClick}
            >
                {upContent}
            </button>
            <button
                className={`button button-up-down button-down ${buttonDownDisabledClass}`}
                disabled={downDisabled}
                onClick={downOnClick}
            >
                {downContent}
            </button>
        </div>
    );
};

export default UpDownButton;
