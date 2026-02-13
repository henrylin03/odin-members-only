import type { Request, Response } from "express";

const allThoughtsGet = (_req: Request, res: Response) =>
	res.render("pages/allThoughts");

const newThoughtGet = (_req: Request, res: Response) => {
	res.render("pages/newThought", { title: "Add thought" });
};

export { allThoughtsGet, newThoughtGet };
