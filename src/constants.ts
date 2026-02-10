import "dotenv/config";

const DATABASE_NAME = "members_only";
export const LOCAL_DATABASE_URL = `postgresql://${process.env.USER_NAME}:${process.env.PASSWORD}@localhost:5432/${DATABASE_NAME}`;
