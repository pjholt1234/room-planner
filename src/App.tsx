import ToolButton from './components/ToolButton';
import GridIcon from './components/icons/GridIcon';
import RectangleIcon from './components/icons/RectangleIcon';
import TextIcon from './components/icons/TextIcon';
import FillIcon from './components/icons/FillIcon';
import TriangleIcon from './components/icons/TriangleIcon';
import CircleIcon from './components/icons/CircleIcon';

function App() {
    return (
        <>
            <div className="toolbar-wrapper">
                <ToolButton icon={<RectangleIcon />} />
                <ToolButton icon={<TriangleIcon />} />
                <ToolButton icon={<CircleIcon />} />
            </div>
            <div className="toolbar-wrapper">
                <ToolButton icon={<GridIcon />} />
                <ToolButton icon={<TextIcon />} />
                <ToolButton icon={<FillIcon />} />
            </div>
        </>
    );
}

export default App;
