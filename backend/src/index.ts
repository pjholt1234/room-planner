import MongoDatabase from './database/MongoDatabase';
import Server from './server/Server';

const database = new MongoDatabase();
const server = new Server();

module.exports = { database, server };
