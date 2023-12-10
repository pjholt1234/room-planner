import MongoDatabase from "./database/MongoDatabase";
import Server from "./server/Server";

const database = MongoDatabase.getInstance();
const server = new Server();

export { database, server };
