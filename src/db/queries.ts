import type { UserData } from "@/models/user.js";
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

const addThought = async (
	authorId: string,
	thoughtTitle: string,
	thoughtBody: string,
) => {
	try {
		await pool.query(
			"INSERT INTO thoughts (author_id, title, text) VALUES ($1, $2, $3)",
			[authorId, thoughtTitle, thoughtBody],
		);
		console.log("Thought successfully added to database.");
	} catch (err) {
		console.error("Error adding thought:", err);
		throw err;
	}
};

const getAllThoughts = async () => {
	const { rows } = await pool.query(`
SELECT 
	u.first_name AS author_first_name, 
	u.last_name AS author_last_name, 
	t.title, 
	t.text, 
	t.timestamp
FROM thoughts AS t
JOIN users AS u 
	ON t.author_id = u.id
ORDER BY t.timestamp DESC;`);

	return rows;
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

type PermissionLevels = "member" | "admin";
const getPermissionElevationPasskey = async (
	permissionLevel: PermissionLevels,
) => {
	const { rows } = await pool.query(
		"SELECT passkey FROM passkeys WHERE elevate_to = $1;",
		[permissionLevel],
	);
	if (!rows.length) return null;
	return rows[0].passkey;
};

const elevateUserToMember = async (userId: string) => {
	try {
		await pool.query("UPDATE users SET is_member = true WHERE id = $1", [
			userId,
		]);
		console.log("User has been added as member");
	} catch (err) {
		console.error("Error when elevating user to member status:", err);
		throw err;
	}
};

const elevateUserToAdmin = async (userId: string) => {
	try {
		// all admins should also be members
		await pool.query(
			"UPDATE users SET is_admin = true, is_member = true WHERE id = $1",
			[userId],
		);
		console.log("User has been added as admin and member");
	} catch (err) {
		console.error("Error when elevating user to admin status:", err);
		throw err;
	}
};

export {
	addThought,
	addUser,
	elevateUserToMember,
	elevateUserToAdmin,
	getAllThoughts,
	getPermissionElevationPasskey,
	getUserById,
	getUserByUsername,
};
