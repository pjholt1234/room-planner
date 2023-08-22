import { FC, ReactNode } from 'react';

interface ToolButtonProps {
    icon: ReactNode;
}

const ToolButton: FC<ToolButtonProps> = ({ icon }: ToolButtonProps) => {
    return (
        <div className="toolbar-button" onClick={() => console.log('clicked')}>
            {icon}
        </div>
    );
};

export default ToolButton;
