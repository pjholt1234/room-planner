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
  await mongoServer.stop();
});

describe("MongoDatabase", () => {
  test("should connect to the database", async () => {
    const db = MongoDatabase.getInstance();
    expect(mongoose.connection.readyState).toBeGreaterThanOrEqual(1);
  });

  test("should register models", async () => {
    const db = MongoDatabase.getInstance();
    expect(Object.keys(db.models).length).toBeGreaterThan(0);
  });
});
