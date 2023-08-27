import mongoose from 'mongoose';
import importEnv from '../ImportEnv';

class MongoDatabase {
    constructor() {
        importEnv();
        this.connectToDatabase();
    }

    private getDatabaseUri(): string {
        const start = 'mongodb://';
        return `${start}${process.env.DB_SERVER_NAME}:${process.env.DB_PORT}/`;
    }

    private async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(this.getDatabaseUri(), {
                dbName: process.env.DB_NAME
            });
            console.log('Connected to database');
        } catch (err) {
            console.error('Error connecting to database:', err);
        }
    }
}

export default MongoDatabase;
