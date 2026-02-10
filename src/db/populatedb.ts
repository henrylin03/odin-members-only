#! /usr/bin/env node

import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const main = async () => {
	const DATABASE_NAME = "members_only";
	const CREATE_TABLES_QUERY = `
CREATE TABLE IF NOT EXISTS users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
    password text NOT NULL,
    is_member boolean NOT NULL DEFAULT false,
    is_admin boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_id integer REFERENCES users(id),
    title varchar(70) NOT NULL,
    text varchar(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT now()
);
`;

	const localDatabaseUrl = `postgresql://${process.env.USER_NAME}:${process.env.PASSWORD}@localhost:5432/${DATABASE_NAME}`;
	console.log("seeding...");
	const client = new Client({
		connectionString: localDatabaseUrl,
	});

	await client.connect();
	await client.query(CREATE_TABLES_QUERY);
	await client.end();
	console.log("done");
};

main();
