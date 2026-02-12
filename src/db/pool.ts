import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
	connectionString: process.env.LOCAL_DATABASE_URL,
});
