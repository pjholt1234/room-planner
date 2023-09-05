import { useEffect, useState } from 'react';
import PlanManager from '../data-access/PlanManager';
import usePlanRepository from '../hooks/usePlanRepository';
import apiClient from '../data-access/ApiClient';
import Dropdown from './Dropdown';
import { translatePlansToDropdownOptions } from './helpers/helpers';
import SaveAsIcon from './icons/SaveAsIcon';
import SaveIcon from './icons/SaveIcon';
import LoadIcon from './icons/LoadIcon';
import DeleteIcon from './icons/DeleteIcon';

const PlanToolbar = () => {
    const { error, loading, loadAllPlans } = usePlanRepository(new apiClient());
    const [plans, setPlans] = useState<any[]>([]);
    const [plan, setPlan] = useState(PlanManager.getInstance().getPlanId());
    const [dropdownState, setDropdownState] = useState<any>({});

    const planManager = PlanManager.getInstance();

    useEffect(() => {
        const observer = (newPlan: string) => {
            setPlan(newPlan);
        };

        planManager.addLoadingObserver(observer);

        return () => {
            planManager.removeLoadingObserver(observer);
        };
    }, []);

    useEffect(() => {
        const observer = () => {
            fetchPlans();
        };

        planManager.addSavingObserver(observer);

        return () => {
            planManager.removeSavingObserver(observer);
        };
    }, []);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        const loadedPlans = await loadAllPlans();
        if (loadedPlans) {
            setPlans(translatePlansToDropdownOptions(loadedPlans));
        }
    };

    const handleSave = () => {
        if (!dropdownState) return;
        planManager.notifySaveObservers();
    };

    const handleLoad = () => {
        if (!dropdownState || dropdownState == '') return;
        planManager.loadPlan(dropdownState.value);
    };

    const handleDelete = () => {
        if (!dropdownState || dropdownState == '') return;
        planManager.notifyDeleteObservers();
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
                selectedKey={plan}
                disabled={isDisabled}
                options={plans}
                onSelect={(option: any) => setDropdownState(option)}
            />
            <button
                disabled={isDisabled}
                className={getButtonClasses(isDisabled)}
                onClick={handleLoad}
            >
                <LoadIcon />
            </button>
            <button
                disabled={isDisabled}
                className={getButtonClasses(isDisabled)}
                onClick={handleSave}
            >
                {plan === 'new' ? <SaveIcon /> : <SaveAsIcon />}
            </button>
            <button
                disabled={isDisabled}
                className={getButtonClasses(isDisabled)}
                onClick={handleDelete}
            >
                <DeleteIcon />
            </button>
        </div>
    );
};

export default PlanToolbar;
