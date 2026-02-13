import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { addThought, getAllThoughts } from "@/db/queries.js";
import { validateNewThought } from "@/helpers/validation.js";

const allThoughtsGet = async (_req: Request, res: Response) => {
	const thoughts = await getAllThoughts();
	res.render("pages/allThoughts", { thoughts });
};

const newThoughtGet = (_req: Request, res: Response) => {
	res.render("pages/newThought", { title: "Add thought" });
};

const newThoughtPost = [
	validateNewThought,
	async (req: Request, res: Response) => {
		const currentUser = req.user;
		if (!currentUser) return res.redirect("/login");

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res
				.status(400)
				.render("pages/newThought", { errors: errors.array() });

		const { thoughtTitle, thoughtBody } = matchedData(req);
		await addThought(currentUser.id, thoughtTitle, thoughtBody);

		res.redirect("/thoughts");
	},
];

export { allThoughtsGet, newThoughtGet, newThoughtPost };
