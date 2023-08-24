import { ReactNode } from 'react';

interface ToolbarSectionProps {
    children: ReactNode;
    title: string;
}

const ToolbarSection = ({ children, title }: ToolbarSectionProps) => {
    return (
        <div className="toolbar-section">
            <h3 className="toolbar-section__title">{title}</h3>
            {children}
        </div>
    );
};

export default ToolbarSection;
