import { ReactNode } from 'react';

interface ColourPickerBoxProps {
    id: string;
    icon: ReactNode;
    onClick?: (event: any) => void;
    backgroundColour: string;
}

const ColourPickerBox = ({
    id,
    icon,
    onClick,
    backgroundColour
}: ColourPickerBoxProps) => {
    return (
        <>
            {icon}
            <div
                id={id}
                className="colour-picker-box"
                onClick={onClick}
                style={{ backgroundColor: backgroundColour }}
            ></div>
        </>
    );
};

export default ColourPickerBox;
