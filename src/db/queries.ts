import type { UserData } from "../models/user.js";
import { pool } from "./pool.js";

const addUser = async (userData: UserData) => {
	const { firstName, lastName, username, password } = userData;
	try {
		await pool.query(
			"INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
			[firstName, lastName, username, password],
		);
		console.log("User added successfully");
	} catch (error) {
		console.error("Error adding user:", error);
		throw error;
	}
};

// LocalStrategy has to accept username as type string
const getUserByUsername = async (username: string) => {
	const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
		username,
	]);
	if (!rows.length) return null;
	return rows[0];
};

const getUserById = async (id: string) => {
	const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
	if (!rows.length) return null;
	return rows[0];
};

export { addUser, getUserById, getUserByUsername };
