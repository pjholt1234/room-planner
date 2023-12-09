import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
    private readonly baseURL: string;
    private readonly authToken: string | null;

    constructor() {
        this.baseURL = import.meta.env.VITE_API_URL;
        console.log(import.meta.env.VITE_API_URL);
        this.authToken = import.meta.env.VITE_AUTH_TOKEN;
    }

    private async request<T>(
        method: string,
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        try {
            const headers: AxiosRequestConfig['headers'] = {};
            if (this.authToken) {
                headers.authorization = this.authToken;
            }

            const response: AxiosResponse<T> = await axios.request({
                method,
                url: `${this.baseURL}${url}`,
                data,
                headers,
                ...config
            });

            return response.data;
        } catch (error: any) {
            console.error(error);
            const errorAlert = new CustomEvent('alert', {
                detail: {
                    message:
                        'Oops, something went wrong. Please try again later',
                    type: 'error'
                }
            });

            document.dispatchEvent(errorAlert);
            throw 'Oops, something went wrong. Please try again later';
        }
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('GET', url, undefined, config);
    }

    public async post<T>(
        url: string,
        data: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('POST', url, data, config);
    }

    public async put<T>(
        url: string,
        data: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('PUT', url, data, config);
    }

    public async delete<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('DELETE', url, undefined, config);
    }
}

export default ApiClient;
