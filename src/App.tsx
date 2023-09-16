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
import ColourPicker from './components/ColourPicker';
import DeleteIcon from './components/icons/DeleteIcon';
import AlertModalWrapper from './components/AlertModalWrapper';
import PlanToolbar from './components/PlanToolbar';
import SavePlanModal from './components/SavePlanModal';
import DeletePlanModal from './components/DeletePlanModal';
import LineIcon from './components/icons/LineIcon';

function App() {
    return (
        <>
            <AlertModalWrapper />
            <ActiveToolProvider>
                <ToolbarSection title={'Shapes'}>
                    <div className="toolbar-row">
                        <ToolButton eventName="line" icon={<LineIcon />} />
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
                        <ToolButton
                            eventName="delete-tool"
                            icon={<DeleteIcon />}
                        />
                        <ToolButton eventName="text" icon={<TextIcon />} />
                        <ToolButton eventName="fill" icon={<FillIcon />} />
                    </div>
                </ToolbarSection>
            </ActiveToolProvider>
            <ToolbarSection title={'Colour'}>
                <ColourPicker />
            </ToolbarSection>
            <ToolbarSection title={'Grid'}>
                <GridButtonToolbarRow />
            </ToolbarSection>
            <ToolbarSection title={'Plans'}>
                <PlanToolbar />
            </ToolbarSection>
            <SavePlanModal />
            <DeletePlanModal />
        </>
    );
}

export default App;
