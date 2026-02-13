import { body } from "express-validator";

const ALPHA_ERROR = "must only contain letters.";
const CHAR_LENGTH_ERROR_255 = "must be between 1 and 255 characters.";

const validateRegistrationForm = [
	body("firstName")
		.trim()
		.isAlpha("en-AU", { ignore: "-" })
		.withMessage(`First name ${ALPHA_ERROR}`)
		.isLength({ min: 1, max: 255 })
		.withMessage(`First name ${CHAR_LENGTH_ERROR_255}`),

	body("lastName")
		.trim()
		.isAlpha("en-AU", { ignore: "-" })
		.withMessage(`Last name ${ALPHA_ERROR}`)
		.isLength({ min: 1, max: 255 })
		.withMessage(`Last name ${CHAR_LENGTH_ERROR_255}`),

	body("username")
		.trim()
		.isEmail()
		.withMessage("Please enter a valid email address")
		.isLength({ min: 1, max: 255 })
		.withMessage(`Email ${CHAR_LENGTH_ERROR_255}`),

	body("password")
		.isLength({ min: 8, max: 64 })
		.withMessage("Password must be between 8 and 64 characters"),

	body("confirmPassword")
		.custom((value: string, { req }) => value === req.body.password)
		.withMessage("Passwords must match"),
];

export { validateRegistrationForm };
