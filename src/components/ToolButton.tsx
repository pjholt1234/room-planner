import { FC, ReactNode } from 'react';
import { useActiveTool } from '../hooks/ActiveToolContext';

interface ToolButtonProps {
    icon: ReactNode;
    eventName: string;
}

const ToolButton: FC<ToolButtonProps> = ({
    icon,
    eventName
}: ToolButtonProps) => {
    const { activeTool, setActiveTool } = useActiveTool();

    const event = new Event(eventName);
    const enableTool = (event: Event, eventName: string) => {
        setActiveTool(eventName);
        document.dispatchEvent(event);
    };

    let activeToolClass = '';

    if (activeTool === eventName) {
        activeToolClass = 'toolbar-button--active';
    }

    return (
        <button
            className={`toolbar-button ${activeToolClass}`}
            onClick={() => enableTool(event, eventName)}
        >
            {icon}
        </button>
    );
};
export default ToolButton;
