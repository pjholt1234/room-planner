import importEnv from "../ImportEnv";
import schemaConfig from "./schemas";
import mongoose, { Schema } from "mongoose";

class MongoDatabase {
  public models = <any>{};

  constructor() {
    importEnv();
    this.connectToDatabase();
    this.registerModels();
  }

  private getDatabaseUri(): string {
    return `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`;
  }

  private async connectToDatabase(): Promise<void> {
    console.log("Connecting to database ", this.getDatabaseUri());
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

      this.models[schemaName] = mongoose.model(schemaName, schema);
    }
  }
}

export default MongoDatabase;
