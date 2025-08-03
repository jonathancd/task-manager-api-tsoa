import { AppDataSource } from "../config/database.config";

export async function InitializeDatabases() {
  try {
    await AppDataSource.initialize();
    return true;
  } catch (error) {
    console.log("Error connecting to Databases");
    return false;
  }
}
