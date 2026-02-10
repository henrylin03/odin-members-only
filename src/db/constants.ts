import dotenv from "dotenv";

dotenv.config();

const DATABASE_NAME = "members_only";
const LOCAL_DATABASE_URL = `postgresql://${process.env.USER_NAME}:${process.env.PASSWORD}@localhost:5432/${DATABASE_NAME}`;

export { LOCAL_DATABASE_URL };
