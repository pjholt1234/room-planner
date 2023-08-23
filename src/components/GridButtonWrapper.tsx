import ToggleSwitch from './ToggleSwitch';
import UpIcon from './icons/UpIcon';
import DownIcon from './icons/DownIcon';
import { useEffect, useState } from 'react';
import GridIcon from './icons/GridIcon';
import GridMode from '../canvas/enums/GridMode';
import GridDottedIcon from './icons/GridDottedIcon';
import GridDashedIcon from './icons/GridDashedIcon';

const GridButtonWrapper = () => {
    const [gridEnabled, setGridEnabled] = useState<boolean>(false);
    const [gridMode, setGridMode] = useState<GridMode>(GridMode.LINES);

    const event = new Event('grid');
    const enableTool = (event: Event, toggleState: boolean) => {
        document.dispatchEvent(event);
        setGridEnabled(toggleState);
    };

    useEffect(() => {
        // @ts-ignore
        document.addEventListener(
            'grid-mode-changed',
            (event: CustomEvent<GridMode>) => {
                setGridMode(event.detail);
            }
        );
    }, []);

    const getGridIcon = () => {
        switch (gridMode) {
            case GridMode.DOTTED:
                return <GridDottedIcon />;
            case GridMode.DOTTED_LINES:
                return <GridDashedIcon />;
            default:
                return <GridIcon />;
        }
    };

    const increaseGridSize = new Event('increase-grid-size');
    const decreaseGridSize = new Event('decrease-grid-size');
    const toggleGridMode = new Event('toggle-grid-mode');

    return (
        <div className="toolbar-wrapper">
            <ToggleSwitch
                onToggle={(toggleState: boolean) =>
                    enableTool(event, toggleState)
                }
            />
            <button
                disabled={!gridEnabled}
                onClick={() => document.dispatchEvent(increaseGridSize)}
            >
                <UpIcon />
            </button>
            <button
                disabled={!gridEnabled}
                onClick={() => document.dispatchEvent(decreaseGridSize)}
            >
                <DownIcon />
            </button>

            <button
                disabled={!gridEnabled}
                onClick={() => document.dispatchEvent(toggleGridMode)}
            >
                {getGridIcon()}
            </button>
        </div>
    );
};

export default GridButtonWrapper;
