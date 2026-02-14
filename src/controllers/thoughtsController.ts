import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import updateLocale from "dayjs/plugin/updateLocale.js";
import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { addThought, getAllThoughts } from "@/db/queries.js";
import { validateNewThought } from "@/helpers/validation.js";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale("en", {
	relativeTime: {
		s: "a few seconds",
		m: "1m",
		mm: "%dm",
		h: "1h",
		hh: "%dh",
		d: "1d",
		dd: "%dd",
		M: "1mth",
		MM: "%dmth",
		y: "1y",
		yy: "%dy",
	},
});

const allThoughtsGet = async (_req: Request, res: Response) => {
	const fetchedThoughts = await getAllThoughts();
	const thoughts = fetchedThoughts.map((thought) => {
		const { timestamp, ...attributes } = thought;
		return { ...attributes, timeSincePosting: dayjs(timestamp).toNow(true) };
	});

	res.render("pages/allThoughts", { title: "Latest thoughts", thoughts });
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
