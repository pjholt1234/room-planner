import { FC, useState } from 'react';
import UpIcon from './icons/UpIcon';
import DownIcon from './icons/DownIcon';

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    options: Option[];
    onSelect: (option: Option) => void;
}

const Dropdown: FC<DropdownProps> = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.dropdown')) {
            setIsOpen(false);
        }
    });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        onSelect(option);
        toggleDropdown();
    };

    return (
        <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
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
