import ToolButton from './components/ToolButton';
import GridIcon from './components/icons/GridIcon';
import RectangleIcon from './components/icons/RectangleIcon';
import TextIcon from './components/icons/TextIcon';
import FillIcon from './components/icons/FillIcon';
import TriangleIcon from './components/icons/TriangleIcon';
import CircleIcon from './components/icons/CircleIcon';
import SelectIcon from './components/icons/SelectIcon';
import { ActiveToolProvider } from './hooks/ActiveToolContext';

function App() {
    return (
        <>
            <ActiveToolProvider>
                <div className="toolbar-wrapper">
                    <ToolButton
                        eventName="rectangle"
                        icon={<RectangleIcon />}
                    />
                    <ToolButton eventName="triangle" icon={<TriangleIcon />} />
                    <ToolButton eventName="circle" icon={<CircleIcon />} />
                </div>
                <div className="toolbar-wrapper">
                    <ToolButton eventName="select" icon={<SelectIcon />} />
                    <ToolButton eventName="text" icon={<TextIcon />} />
                    <ToolButton eventName="fill" icon={<FillIcon />} />
                </div>
                <div className="toolbar-wrapper">
                    <ToolButton
                        eventName="grid"
                        icon={<GridIcon />}
                        isToggleable={true}
                    />
                </div>
            </ActiveToolProvider>
        </>
    );
}

export default App;
