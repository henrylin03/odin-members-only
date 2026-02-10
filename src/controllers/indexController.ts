import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
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

		const formValues = matchedData(req);

		// await db.doSomething(formValues);

		res.redirect("/register");
	},
];

export { showHomePageGet, registerUserGet, registerUserPost };
