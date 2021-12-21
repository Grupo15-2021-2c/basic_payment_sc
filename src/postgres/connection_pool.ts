import { Pool } from "pg";
import { config } from "./config";

export const connectionPool = new Pool(config);
