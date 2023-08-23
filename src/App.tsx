import ToolButton from './components/ToolButton';
import GridIcon from './components/icons/GridIcon';
import RectangleIcon from './components/icons/RectangleIcon';
import TextIcon from './components/icons/TextIcon';
import FillIcon from './components/icons/FillIcon';
import TriangleIcon from './components/icons/TriangleIcon';
import CircleIcon from './components/icons/CircleIcon';
import SelectIcon from './components/icons/SelectIcon';

function App() {
    return (
        <>
            <div className="toolbar-wrapper">
                <ToolButton eventName="rectangle" icon={<RectangleIcon />} />
                <ToolButton eventName="triangle" icon={<TriangleIcon />} />
                <ToolButton eventName="circle" icon={<CircleIcon />} />
            </div>
            <div className="toolbar-wrapper">
                <ToolButton eventName="select" icon={<SelectIcon />} />
                <ToolButton eventName="grid" icon={<GridIcon />} />
                <ToolButton eventName="text" icon={<TextIcon />} />
                <ToolButton eventName="fill" icon={<FillIcon />} />
            </div>
        </>
    );
}

export default App;
