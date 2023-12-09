import { FC, useState } from 'react';

interface ToggleSwitchProps {
    onToggle: (isChecked: boolean) => void;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({ onToggle }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onToggle(newValue);
    };

    return (
        <label className="toggle-switch">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
            />
            <span className="toggle-switch-slider"></span>
        </label>
    );
};

export default ToggleSwitch;
