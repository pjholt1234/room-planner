import ApiClient from './ApiClient';
import ShapeInterface from '../canvas/shapes/ShapeInterface';
import Rectangle from '../canvas/shapes/Rectangle';
import Circle from '../canvas/shapes/Circle';
import Triangle from '../canvas/shapes/Triangle';
import Text from '../canvas/utilities/Text';

class PlanRepository {
    private baseUrl: string = '';
    private shapeMap: any;

    constructor(public apiClient: ApiClient) {
        this.apiClient = apiClient;
        this.shapeMap = {
            Rectangle,
            Circle,
            Triangle,
            Text
        };
    }

    public async savePlan(
        id: string,
        planName: string,
        planData: ShapeInterface[]
    ): Promise<void> {
        const plan: any = { planName: planName, planData: [] };

        planData.map((object: ShapeInterface) => {
            // @ts-ignore
            plan.planData.push(object.encode());
        });

        if (id) {
            return await this.apiClient.post(
                `${this.baseUrl}/update/${id}`,
                plan
            );
        }

        return await this.apiClient.post(`${this.baseUrl}/create`, plan);
    }

    public async loadPlan(id: string): Promise<any> {
        const response: any[] = await this.apiClient.get(
            `${this.baseUrl}/${id}`
        );

        if (response.length !== 1) {
            throw new Error('Plan not found');
        }

        const data = response[0];

        return {
            id: data._id,
            planName: data.planName,
            canvasObjects: this.preparePlanData(data.planData)
        };
    }

    public async deletePlan(id: string): Promise<any> {
        return await this.apiClient.delete(`${this.baseUrl}/delete/${id}`);
    }

    public async loadAllPlans(): Promise<void> {
        return await this.apiClient.get(`${this.baseUrl}`);
    }

    private preparePlanData(planData: any): ShapeInterface[] {
        const canvasObjects: ShapeInterface[] = [];
        planData.map((object: any) => {
            const Object = this.shapeMap[object.type];
            if (object.isText) {
                const text = new Object(
                    object.textStartPoint,
                    object.body,
                    object.fontSize,
                    object.font
                );
                text.strokeColour = object.strokeColour;
                canvasObjects.push(text);
            } else {
                const shape = new Object(object.points);
                shape.strokeColour = object.strokeColour;
                shape.fillColour = object.fillColour;
                canvasObjects.push(shape);
            }
        });

        return canvasObjects;
    }
}

export default PlanRepository;
