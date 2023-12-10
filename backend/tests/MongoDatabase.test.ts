import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import MongoDatabase from "../src/database/MongoDatabase";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.DB_HOST = mongoUri;
  process.env.DB_PORT = "";
  process.env.DB_NAME = "test";
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("should connect to the database", async () => {
  const db = new MongoDatabase();
  expect(mongoose.connection.readyState).toBeGreaterThan(1);
});

test("should register models", async () => {
  const db = new MongoDatabase();
  expect(Object.keys(db.models).length).toBeGreaterThan(0);
});
