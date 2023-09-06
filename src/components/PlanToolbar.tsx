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

        planManager.addObserver('loading', observer);

        return () => {
            planManager.removeObserver('loading', observer);
        };
    }, []);

    useEffect(() => {
        const fetchAndSetPlans = async () => {
            const loadedPlans = await loadAllPlans();
            if (loadedPlans) {
                setPlans(translatePlansToDropdownOptions(loadedPlans));
            }
        };

        fetchAndSetPlans();

        const observer = async () => {
            await fetchAndSetPlans();
        };

        planManager.addObserver('saved', observer);

        return () => {
            planManager.removeObserver('saved', observer);
        };
    }, []);

    useEffect(() => {
        const fetchAndSetPlans = async () => {
            const loadedPlans = await loadAllPlans();
            if (loadedPlans) {
                setPlans(translatePlansToDropdownOptions(loadedPlans));
            }
        };

        fetchAndSetPlans();

        const observer = async () => {
            await fetchAndSetPlans();
        };

        planManager.addObserver('deleted', observer);

        return () => {
            planManager.removeObserver('deleted', observer);
        };
    }, []);

    const handleSave = () => {
        if (!dropdownState) return;
        planManager.notifyObservers('save');
    };

    const handleLoad = () => {
        if (!dropdownState || dropdownState == '') return;
        planManager.loadPlan(dropdownState.value);
    };

    const handleDelete = () => {
        if (!dropdownState || dropdownState == '') return;
        planManager.notifyObservers('delete');
    };

    const isDisabled: boolean = !!(error || loading);
    const noSelectedOption =
        Object.keys(dropdownState).length === 0 || dropdownState.value == 'new';

    const getButtonClasses = (isDisabled: boolean): string => {
        const baseClasses: string = 'button button-circle';

        if (isDisabled) {
            return `${baseClasses} button-circle--disabled`;
        }

        if (loading || error) {
            return `${baseClasses} button-circle--disabled loading`;
        }

        return baseClasses;
    };

    return (
        <div className="toolbar-row">
            <Dropdown
                className={loading || error ? 'loading' : ''}
                selectedKey={plan}
                disabled={isDisabled}
                options={plans}
                onSelect={(option: any) => setDropdownState(option)}
            />
            <button
                disabled={isDisabled || noSelectedOption}
                className={getButtonClasses(isDisabled || noSelectedOption)}
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
                disabled={isDisabled || plan === 'new'}
                className={`${getButtonClasses(
                    isDisabled || plan === 'new'
                )}  button-circle--danger`}
                onClick={handleDelete}
            >
                <DeleteIcon />
            </button>
        </div>
    );
};

export default PlanToolbar;
