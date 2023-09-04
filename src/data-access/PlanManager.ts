import PlanRepository from './PlanRepository';
import ApiClient from './ApiClient';
import ShapeInterface from '../canvas/shapes/ShapeInterface';

type Observer = (newPlan: string) => void;

class PlanManager {
    public currentPlan: any = null;

    private static instance: PlanManager | null = null;
    private planRepository: PlanRepository;
    private planId: string = 'new';
    private planName: string = 'Untitled';
    private saveObservers: Observer[] = [];
    private savingObservers: Observer[] = [];
    private loadingObservers: Observer[] = [];

    constructor(planRepository: PlanRepository) {
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

    public async loadPlan(newPlan: string): Promise<void> {
        if (newPlan === 'new' || newPlan === null) {
            return;
        }

        this.planId = newPlan;
        this.currentPlan = await this.planRepository.load(newPlan);
        this.planName = this.currentPlan.planName;

        console.log('Loaded plan: ', this.planName);

        this.notifyLoadingObservers();

        const loadPlanAlert = new CustomEvent('alert', {
            detail: {
                message: 'Plan loaded successfully',
                type: 'success'
            }
        });

        document.dispatchEvent(loadPlanAlert);
    }

    public async savePlan(canvasObjects: ShapeInterface[]): Promise<void> {
        const planId = this.planId === 'new' ? '' : this.planId;

        await this.planRepository
            .save(planId, this.planName, canvasObjects)
            .then((response: any) => {
                this.planId = response._id;
            });

        const savePlanAlert = new CustomEvent('alert', {
            detail: {
                message: `${this.planName} saved successfully`,
                type: 'success'
            }
        });

        document.dispatchEvent(savePlanAlert);
    }

    public getPlanId(): string {
        return this.planId;
    }

    public setPlanName(planName: string): void {
        this.planName = planName;
    }

    public getPlanName(): string {
        return this.planName;
    }

    public addSaveObserver(observer: Observer): void {
        this.saveObservers.push(observer);
    }

    public removeSaveObserver(observer: Observer): void {
        this.saveObservers = this.saveObservers.filter(
            (obs) => obs !== observer
        );
    }

    public notifySaveObservers(): void {
        this.saveObservers.forEach((observer) => observer(this.planId));
    }

    public addSavingObserver(observer: Observer): void {
        this.savingObservers.push(observer);
    }

    public removeSavingObserver(observer: Observer): void {
        this.savingObservers = this.savingObservers.filter(
            (obs) => obs !== observer
        );
    }

    public notifySavingObservers(): void {
        this.savingObservers.forEach((observer) => observer(this.planId));
    }

    public addLoadingObserver(observer: Observer): void {
        this.loadingObservers.push(observer);
    }

    public removeLoadingObserver(observer: Observer): void {
        this.loadingObservers = this.loadingObservers.filter(
            (obs) => obs !== observer
        );
    }

    public notifyLoadingObservers(): void {
        this.loadingObservers.forEach((observer) => observer(this.planId));
    }
}

export default PlanManager;
