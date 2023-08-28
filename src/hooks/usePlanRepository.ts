import { useState } from 'react';
import ApiClient from '../data-access/ApiClient';
import PlanRepository from '../data-access/PlanRepository';

const usePlanRepository = (apiClient: ApiClient) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const planRepository = new PlanRepository(apiClient);

    const savePlan = async (data: any) => {
        try {
            setLoading(true);
            setError(null);
            await planRepository.savePlan(data);
        } catch (error) {
            setError('Failed to save plan');
        } finally {
            setLoading(false);
        }
    };

    const loadPlan = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            return await planRepository.loadPlan(id);
        } catch (error) {
            setError('Failed to load plan');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deletePlan = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await planRepository.deletePlan(id);
        } catch (error) {
            setError('Failed to delete plan');
        } finally {
            setLoading(false);
        }
    };

    const loadAllPlans = async () => {
        try {
            setLoading(true);
            setError(null);
            return await planRepository.loadAllPlans();
        } catch (error) {
            setError('Failed to load plans');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        savePlan,
        loadPlan,
        deletePlan,
        loadAllPlans
    };
};

export default usePlanRepository;
