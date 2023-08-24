import ToolButton from './components/ToolButton';
import RectangleIcon from './components/icons/RectangleIcon';
import TextIcon from './components/icons/TextIcon';
import FillIcon from './components/icons/FillIcon';
import TriangleIcon from './components/icons/TriangleIcon';
import CircleIcon from './components/icons/CircleIcon';
import SelectIcon from './components/icons/SelectIcon';
import { ActiveToolProvider } from './hooks/ActiveToolContext';
import GridButtonToolbarRow from './components/GridButtonToolbarRow';
import ToolbarSection from './ToolbarSection';

function App() {
    return (
        <>
            <ActiveToolProvider>
                <ToolbarSection title={'Shapes'}>
                    <div className="toolbar-row">
                        <ToolButton
                            eventName="rectangle"
                            icon={<RectangleIcon />}
                        />
                        <ToolButton
                            eventName="triangle"
                            icon={<TriangleIcon />}
                        />
                        <ToolButton eventName="circle" icon={<CircleIcon />} />
                    </div>
                </ToolbarSection>
                <ToolbarSection title={'Tools'}>
                    <div className="toolbar-row">
                        <ToolButton eventName="select" icon={<SelectIcon />} />
                        <ToolButton eventName="text" icon={<TextIcon />} />
                        <ToolButton eventName="fill" icon={<FillIcon />} />
                    </div>
                </ToolbarSection>
            </ActiveToolProvider>
            <ToolbarSection title={'Grid'}>
                <GridButtonToolbarRow />
            </ToolbarSection>
        </>
    );
}

export default App;
