import { Pool } from "pg";
import { LOCAL_DATABASE_URL } from "./constants.js";

export const pool = new Pool({ connectionString: LOCAL_DATABASE_URL });
