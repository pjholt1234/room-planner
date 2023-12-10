import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
// @ts-ignore
import supertest from "supertest";
import MongoDatabase from "../src/database/MongoDatabase";
import { server } from "../src";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  process.env.APP_PORT = "1234";
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.DB_HOST = mongoUri;
  process.env.DB_PORT = "";
  process.env.DB_NAME = "test";
  process.env.BASIC_AUTH_SECRET = "testing";
  MongoDatabase.getInstance(); // Initialize the database
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("PlanController", () => {
  test("should 403 with incorrect auth header", async () => {
    const response = await supertest(server.app)
      .get("/plan")
      .set("authorization", btoa("testing2"));

    expect(response.status).toBe(403);
  });

  test("should fetch all plans", async () => {
    const response = await supertest(server.app)
      .get("/")
      .set("authorization", btoa("testing"));

    expect(response.status).toBe(200);
  });
});
