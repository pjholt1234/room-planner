import ApiClient from './ApiClient';
import ShapeInterface from '../canvas/shapes/ShapeInterface';
import Rectangle from '../canvas/shapes/Rectangle';
import Circle from '../canvas/shapes/Circle';
import Triangle from '../canvas/shapes/Triangle';
import Text from '../canvas/utilities/Text';
import Line from '../canvas/shapes/Line';
import CustomShape from '../canvas/shapes/CustomShape';
import Room from '../canvas/shapes/Room';

class PlanRepository {
    private baseUrl: string = '';
    private shapeMap: any;

    constructor(public apiClient: ApiClient) {
        this.apiClient = apiClient;
        this.shapeMap = {
            Rectangle,
            Circle,
            Triangle,
            Text,
            Line,
            CustomShape
        };
    }

    public async save(
        id: string,
        planName: string,
        planData: ShapeInterface[],
        roomData: Room
    ): Promise<void> {
        const plan: any = { planName: planName, planData: [], roomData: {} };

        planData.map((object: ShapeInterface) => {
            // @ts-ignore
            plan.planData.push(object.encode());
        });

        plan.roomData = roomData.encode();

        if (id) {
            return await this.apiClient.post(
                `${this.baseUrl}/update/${id}`,
                plan
            );
        }

        return await this.apiClient.post(`${this.baseUrl}/create`, plan);
    }

    public async load(id: string): Promise<any> {
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
            canvasObjects: this.prepareDataForCanvas(data.planData),
            room: this.prepareRoomDataForCanvas(data.roomData)
        };
    }

    public async delete(id: string): Promise<any> {
        return await this.apiClient.delete(`${this.baseUrl}/delete/${id}`);
    }

    public async loadAll(): Promise<void> {
        return await this.apiClient.get(`${this.baseUrl}`);
    }

    private prepareDataForCanvas(planData: any): ShapeInterface[] {
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

    private prepareRoomDataForCanvas(roomData: any): Room {
        const room = new Room(roomData.points);
        room.strokeColour = roomData.strokeColour;

        return room;
    }
}

export default PlanRepository;
