import express from 'express';
import cors from 'cors';
import importEnv from '../ImportEnv';
import routes from './routes';
import Route from '../types/Route';

class Server {
    public app: express.Application;
    private routes: any[];

    constructor() {
        importEnv();
        this.app = express();
        this.routes = routes;
        this.setUpServer();
        this.registerRoutes();
    }

    private setUpServer(): void {
        console.log('Setting up server'); // Debugging line
        this.app.use(express.json());
        this.app.use(cors());

        this.app.listen(process.env.APP_PORT, () => {
            console.log(`Server is running on port ${process.env.APP_PORT}`);
        });
    }

    private registerRoutes(): void {
        this.routes.map((route: Route) => {
            const requestType = route.method as keyof express.Application;
            const Controller = route.controller;
            const controllerFunction =
                route.controllerFunction as keyof typeof Controller;

            if (
                typeof this.app[requestType] !== 'function' ||
                typeof Controller[controllerFunction] !== 'function'
            ) {
                console.log(Controller[controllerFunction]);
                throw new Error('Invalid route');
            }

            this.app[requestType](route.path, (req: Request, res: Response) =>
                //@ts-ignore
                Controller[controllerFunction](req, res)
            );
        });
    }
}

export default Server;
