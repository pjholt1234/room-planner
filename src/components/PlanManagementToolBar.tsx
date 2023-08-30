import apiClient from '../data-access/ApiClient';
import usePlanRepository from '../hooks/usePlanRepository';
import { useEffect, useState } from 'react';
import LoadIcon from './icons/LoadIcon';
import SaveIcon from './icons/SaveIcon';
import Dropdown from './Dropdown';
import SavePlanModal from './SavePlanModal';
import SaveAsIcon from './icons/SaveAsIcon';

const PlanManagementToolBar = () => {
    const { error, loading, loadAllPlans } = usePlanRepository(new apiClient());

    const [plans, setPlans] = useState<any[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
        const fetchPlans = async () => {
            const loadedPlans = await loadAllPlans();
            if (loadedPlans) {
                setPlans(translateOptions(loadedPlans));
            }
        };

        fetchPlans();
    }, [reloadCount]);

    useEffect(() => {
        const handleBrowserEvent = () => {
            setReloadCount((prevCount) => prevCount + 1);
        };

        document.addEventListener('plan-saved', handleBrowserEvent);

        return () => {
            document.removeEventListener('plan-saved', handleBrowserEvent);
        };
    }, []);

    const translateOptions = (plans: any[]) => {
        return plans.map((plan) => {
            return {
                label: plan.planName,
                value: plan._id
            };
        });
    };

    const handlePlanSelect = (option: any) => {
        setSelectedPlanId(option.value);
    };

    const handleLoadPlan = () => {
        if (!selectedPlanId) return;

        const loadPlanEvent = new CustomEvent('load-plan', {
            detail: selectedPlanId
        });

        document.dispatchEvent(loadPlanEvent);
    };

    const handleSaveButtonClicked = () => {
        if (loading || error) return;
        setShowModal(true);
    };

    const dispatchSavePlanEvent = (name: string) => {
        const savePlanEvent = new CustomEvent('save-plan', { detail: name });
        document.dispatchEvent(savePlanEvent);
    };

    const isDisabled: boolean = !!(error || loading);
    const getButtonClasses = (isDisabled: boolean): string => {
        const baseClasses: string = 'button button-circle';

        if (!isDisabled) {
            return baseClasses;
        }

        return `${baseClasses} button-circle--disabled`;
    };

    return (
        <>
            <SavePlanModal
                showModal={showModal}
                onSubmit={dispatchSavePlanEvent}
                onClose={() => setShowModal(false)}
            />
            <div className="toolbar-row">
                <Dropdown
                    disabled={isDisabled}
                    options={plans}
                    onSelect={handlePlanSelect}
                />
                <button
                    disabled={isDisabled || !selectedPlanId}
                    className={getButtonClasses(isDisabled || !selectedPlanId)}
                    onClick={handleLoadPlan}
                >
                    <LoadIcon />
                </button>
                <button
                    disabled={isDisabled}
                    className={getButtonClasses(isDisabled)}
                    onClick={handleSaveButtonClicked}
                >
                    {selectedPlanId ? <SaveAsIcon /> : <SaveIcon />}
                </button>
            </div>
        </>
    );
};

export default PlanManagementToolBar;
