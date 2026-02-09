require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool({
	host: "localhost",
	user: process.env.DB_USER,
	database: "NAME_OF_DATABASE_FOR_THIS_PROJECT",
	password: process.env.DB_PASSWORD,
	port: 5432,
});

// alternatively, can use Connection URI: https://node-postgres.com/features/connecting#connection-uri
// module.exports = new Pool({
//   connectionString:
//     "postgresql://<role_name>:<role_password>@localhost:5432/<databaseName>",
// });
