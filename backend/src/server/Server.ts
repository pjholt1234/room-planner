import express from 'express';
import cors from 'cors';
import importEnv from '../ImportEnv';

class Server {
    public app: express.Application;

    constructor() {
        importEnv();
        this.app = express();
        this.setUpServer();
    }

    private setUpServer() {
        console.log('Setting up server'); // Debugging line
        this.app.use(express.json());
        this.app.use(cors());

        this.app.listen(process.env.APP_PORT, () => {
            console.log(`Server is running on port ${process.env.APP_PORT}`);
        });
    }
}

export default Server;
