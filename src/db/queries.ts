import { pool } from "./pool.js";

type Email = `${string}@${string}`;
type RegistrationFormData = {
	firstName: string;
	lastName: string;
	username: Email;
	password: string;
	confirmPassword: string;
};

const addUser = async (userData: RegistrationFormData) => {
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

export { addUser };
