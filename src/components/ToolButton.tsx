import { ReactNode } from 'react';
import { useActiveTool } from '../hooks/ActiveToolContext';

interface ToolButtonProps {
    icon: ReactNode;
    eventName: string;
}

const ToolButton = ({ icon, eventName }: ToolButtonProps) => {
    const { activeTool, setActiveTool } = useActiveTool();

    const event = new Event(eventName);
    const enableTool = (event: Event, eventName: string) => {
        setActiveTool(eventName);
        document.dispatchEvent(event);
    };

    let activeToolClass = '';

    if (activeTool === eventName) {
        activeToolClass = 'button-circle--active';
    }

    return (
        <button
            className={`button button-circle ${activeToolClass}`}
            onClick={() => enableTool(event, eventName)}
        >
            {icon}
        </button>
    );
};
export default ToolButton;
