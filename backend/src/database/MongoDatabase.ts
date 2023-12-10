import importEnv from "../ImportEnv";
import schemaConfig from "./schemas";
import mongoose, { Schema } from "mongoose";

class MongoDatabase {
  public models = <any>{};
  private static instance: MongoDatabase;

  private constructor() {
    importEnv();
    this.connectToDatabase();
    this.registerModels();
  }

  public static getInstance(): MongoDatabase {
    if (!this.instance) {
      this.instance = new MongoDatabase();
    }
    return this.instance;
  }

  private getDatabaseUri(): string {
    return `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`;
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await mongoose.connect(this.getDatabaseUri(), {
        dbName: process.env.DB_NAME,
      });
      console.log("Connected to database");
    } catch (err) {
      console.error("Error connecting to database:", err);
    }
  }

  private async registerModels(): Promise<void> {
    for (const schemaName in schemaConfig) {
      let schema: Schema;

      if (Object.keys(schemaConfig[schemaName]).length === 0) {
        schema = new mongoose.Schema(schemaConfig[schemaName], {
          strict: false,
        });
      } else {
        schema = new mongoose.Schema(schemaConfig[schemaName]);
      }

      // Check if the model has already been registered
      if (!mongoose.models[schemaName]) {
        this.models[schemaName] = mongoose.model(schemaName, schema);
      } else {
        // If the model is already registered, use the existing model
        this.models[schemaName] = mongoose.model(schemaName);
      }
    }
  }
}

export default MongoDatabase;
