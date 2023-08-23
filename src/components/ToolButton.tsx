import { FC, ReactNode } from 'react';

interface ToolButtonProps {
    icon: ReactNode;
    eventName: string;
}

const ToolButton: FC<ToolButtonProps> = ({
    icon,
    eventName
}: ToolButtonProps) => {
    const event = new Event(eventName);
    return (
        <button className="toolbar-button" onClick={() => dispatchEvent(event)}>
            {icon}
        </button>
    );
};

const dispatchEvent = (event: Event) => {
    console.log('dispatching event', event);
    document.dispatchEvent(event);
};

export default ToolButton;
