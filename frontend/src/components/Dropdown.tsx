import { FC, useEffect, useState } from 'react';
import UpIcon from './icons/UpIcon';
import DownIcon from './icons/DownIcon';

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    className?: string;
    options: Option[];
    onSelect: (option: Option) => void;
    disabled?: boolean;
    selectedKey?: string | null;
}

const Dropdown: FC<DropdownProps> = ({
    className,
    options,
    onSelect,
    disabled = false,
    selectedKey = null
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.dropdown')) {
            setIsOpen(false);
        }
    });

    useEffect(() => {
        if (!selectedKey) {
            setSelectedOption(null);
            return;
        }

        const option: Option | undefined = options.find(
            (obj) => obj.value === selectedKey
        );

        if (!option) {
            setSelectedOption(null);
            return;
        }

        setSelectedOption(option);
    }, [options]);

    const toggleDropdown = () => {
        if (disabled) return;
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: Option) => {
        if (disabled) return;
        setSelectedOption(option);
        onSelect(option);
        toggleDropdown();
    };

    return (
        <div className={`dropdown ${className}`}>
            <div
                className={`dropdown-header ${
                    disabled ? 'dropdown--disabled' : ''
                }`}
                onClick={toggleDropdown}
            >
                {selectedOption ? selectedOption.label : 'Select an option'}
                {isOpen ? (
                    <UpIcon className="dropdown-header__chevron" />
                ) : (
                    <DownIcon className="dropdown-header__chevron" />
                )}
            </div>
            {isOpen && (
                <ul className="dropdown-options">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
