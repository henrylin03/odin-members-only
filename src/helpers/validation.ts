import { body } from "express-validator";

const validateRegistrationForm = [
	body("firstName")
		.trim()
		.isLength({ min: 1, max: 255 })
		.withMessage("First name must be between 1 and 255 characters"),

	body("lastName")
		.trim()
		.isLength({ min: 1, max: 255 })
		.withMessage("Last name must be between 1 and 255 characters"),

	body("username")
		.trim()
		.isLength({ min: 1, max: 255 })
		.withMessage("Email must be between 1 and 255 characters")
		.isEmail()
		.withMessage("Please enter a valid email address"),
];

export { validateRegistrationForm };
