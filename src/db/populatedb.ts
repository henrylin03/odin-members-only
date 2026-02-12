#! /usr/bin/env node

import "dotenv/config";
import bcrypt from "bcryptjs";
import { Client } from "pg";

type PermissionPasskeys = {
	toMember: string;
	toAdmin: string;
};

const getHashedPasskeys = async (): Promise<PermissionPasskeys> => {
	const toMemberPasskey = process.env.BECOME_MEMBER_PASSKEY;
	const toAdminPasskey = process.env.BECOME_ADMIN_PASSKEY;
	if (!toMemberPasskey || !toAdminPasskey)
		throw new Error(
			"Please ensure passkeys are defined in .env file as 'BECOME_MEMBER_PASSKEY' and 'BECOME_ADMIN_PASSKEY'",
		);

	const salt = await bcrypt.genSalt();

	const hashedMemberPasskey = await bcrypt.hash(toMemberPasskey, salt);
	const hashedAdminPasskey = await bcrypt.hash(toAdminPasskey, salt);

	return { toMember: hashedMemberPasskey, toAdmin: hashedAdminPasskey };
};

const main = async () => {
	const permissionPasskeys = await getHashedPasskeys();

	const createTablesQuery = `
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

CREATE TABLE IF NOT EXISTS passkeys (
  elevate_to varchar(70) PRIMARY KEY,
  passkey text NOT NULL
);
`;

	const populateTablesQuery = `
INSERT INTO passkeys VALUES('member', '${permissionPasskeys.toMember}');
INSERT INTO passkeys VALUES('admin', '${permissionPasskeys.toAdmin}');
`;

	console.log("seeding...");
	const client = new Client({
		connectionString: process.env.LOCAL_DATABASE_URL,
	});

	await client.connect();
	await client.query(createTablesQuery);
	await client.query(populateTablesQuery);
	await client.end();
	console.log("done");
};

main();
