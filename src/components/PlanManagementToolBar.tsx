import apiClient from '../data-access/ApiClient';
import usePlanRepository from '../hooks/usePlanRepository';
import { useEffect, useState } from 'react';
import LoadIcon from './icons/LoadIcon';
import SaveIcon from './icons/SaveIcon';

const PlanManagementToolBar = () => {
    const { loadAllPlans } = usePlanRepository(new apiClient());

    const [plans, setPlans] = useState<any[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');

    useEffect(() => {
        const fetchPlans = async () => {
            const loadedPlans = await loadAllPlans();
            if (loadedPlans) {
                setPlans(loadedPlans);
            }
        };

        fetchPlans();
    }, []);

    const handlePlanSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlanId(event.target.value);
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

    return (
        <div className="toolbar-row">
            {plans.length > 0 && (
                <select value={selectedPlanId} onChange={handlePlanSelect}>
                    <option value="">Select a Plan</option>
                    {plans.map((plan) => (
                        <option key={plan._id} value={plan._id}>
                            {plan.planName}
                        </option>
                    ))}
                </select>
            )}

            <button className="button button-circle" onClick={handleLoadPlan}>
                <LoadIcon />
            </button>
            <button className="button button-circle" onClick={handleSavePlan}>
                <SaveIcon />
            </button>
        </div>
    );
};

export default PlanManagementToolBar;
