import PlanRepository from './PlanRepository';
import ApiClient from './ApiClient';
import ShapeInterface from '../canvas/shapes/ShapeInterface';
import Observable from './Observable';
import Room from '../canvas/shapes/Room';

class PlanManager extends Observable {
    public currentPlan: any = null;

    private static instance: PlanManager | null = null;
    private planRepository: PlanRepository;
    private planName: string = '';

    constructor(planRepository: PlanRepository) {
        super();
        this.id = 'new';
        this.planRepository = planRepository;
    }

    public static getInstance(): PlanManager {
        if (!PlanManager.instance) {
            PlanManager.instance = new PlanManager(
                new PlanRepository(new ApiClient())
            );
        }
        return PlanManager.instance;
    }

    public getPlanId(): string {
        return this.id;
    }

    public setPlanName(planName: string): void {
        this.planName = planName;
    }

    public getPlanName(): string {
        return this.planName;
    }

    public async loadPlan(newPlan: string): Promise<void> {
        if (newPlan === 'new' || newPlan === null) {
            return;
        }

        this.id = newPlan;
        this.currentPlan = await this.planRepository.load(newPlan);
        this.planName = this.currentPlan.planName;

        this.notifyObservers('loading');

        const loadPlanAlert = new CustomEvent('alert', {
            detail: {
                message: 'Plan loaded successfully',
                type: 'success'
            }
        });

        document.dispatchEvent(loadPlanAlert);
    }

    public async savePlan(
        canvasObjects: ShapeInterface[],
        room: Room
    ): Promise<void> {
        const planId = this.id === 'new' ? '' : this.id;

        await this.planRepository
            .save(planId, this.planName, canvasObjects, room)
            .then((response: any) => {
                this.id = response._id;
            });

        const savePlanAlert = new CustomEvent('alert', {
            detail: {
                message: `${this.planName} saved successfully`,
                type: 'success'
            }
        });

        document.dispatchEvent(savePlanAlert);

        this.notifyObservers('saved');
    }

    public async deletePlan(): Promise<void> {
        if (!this.id) {
            return;
        }

        await this.planRepository.delete(this.id);

        this.id = 'new';
        this.planName = '';
        this.currentPlan = null;

        const deletePlanAlert = new CustomEvent('alert', {
            detail: {
                message: `${this.planName} deleted successfully`,
                type: 'success'
            }
        });

        document.dispatchEvent(deletePlanAlert);

        this.notifyObservers('deleted');
    }
}

export default PlanManager;
