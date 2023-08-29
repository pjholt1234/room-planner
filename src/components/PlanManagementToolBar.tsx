import apiClient from '../data-access/ApiClient';
import usePlanRepository from '../hooks/usePlanRepository';
import { useEffect, useState } from 'react';
import LoadIcon from './icons/LoadIcon';
import SaveIcon from './icons/SaveIcon';
import Dropdown from './Dropdown';

const PlanManagementToolBar = () => {
    const { error, loading, loadAllPlans } = usePlanRepository(new apiClient());

    const [plans, setPlans] = useState<any[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        const fetchPlans = async () => {
            const loadedPlans = await loadAllPlans();
            if (loadedPlans) {
                setPlans(translateOptions(loadedPlans));
            }
        };

        fetchPlans();
    }, []);

    useEffect(() => {
        document.addEventListener('plan-saved', () => setReload(!reload));

        return () =>
            document.removeEventListener('plan-saved', () =>
                setReload(!reload)
            );
    }, [reload]);

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
        console.log('load plan', selectedPlanId);
        const loadPlanEvent = new CustomEvent('load-plan', {
            detail: selectedPlanId
        });

        document.dispatchEvent(loadPlanEvent);
    };

    const handleSavePlan = () => {
        const name = prompt('Save plan as:');

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
                onClick={handleSavePlan}
            >
                <SaveIcon />
            </button>
        </div>
    );
};

export default PlanManagementToolBar;
