import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { addUser } from "../db/queries.js";
import { validateRegistrationForm } from "../helpers/validation.js";

const showHomePageGet = async (_req: Request, res: Response) => {
	res.render("pages/index");
};

const registerUserGet = async (_req: Request, res: Response) => {
	res.render("pages/signupForm");
};

const registerUserPost = [
	validateRegistrationForm,
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res
				.status(400)
				.render("pages/signupForm", { errors: errors.array() });

		await addUser(matchedData(req));

		res.redirect("/register");
	},
];

export { showHomePageGet, registerUserGet, registerUserPost };
