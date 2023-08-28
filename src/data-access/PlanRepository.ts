import ApiClient from './ApiClient';

class PlanRepository {
    private baseUrl: string = '';

    constructor(public apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    public async savePlan(data: any): Promise<void> {
        return await this.apiClient.post(`${this.baseUrl}/create`, data);
    }

    public async loadPlan(id: string): Promise<any> {
        const response: any[] = await this.apiClient.get(
            `${this.baseUrl}/${id}`
        );

        if (response.length > 0) {
            return response[0];
        }

        return response;
    }

    public async deletePlan(id: string): Promise<any> {
        return await this.apiClient.delete(`${this.baseUrl}/delete/${id}`);
    }

    public async loadAllPlans(): Promise<void> {
        return await this.apiClient.get(`${this.baseUrl}`);
    }
}

export default PlanRepository;
