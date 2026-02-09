#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

// const SQL = `
// CREATE TABLE IF NOT EXISTS messages (
//   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   text VARCHAR ( 280 ) NOT NULL,
// );

// INSERT INTO messages (text)
// VALUES
//   ('Hello, from Henry'),
//   ('This is working');
// `;

// async function main() {
//   const databaseUrl = process.argv[2];
//   if (typeof databaseUrl === "undefined" || databaseUrl === "") {
//     throw new Error(
//       "Database URL not provided. Defaulting to production database."
//     );
//   }

//   console.log("seeding...");
//   const client = new Client({
//     connectionString: databaseUrl,
//   });

//   await client.connect();
//   await client.query(SQL);
//   await client.end();
//   console.log("done");
// }

// main();
