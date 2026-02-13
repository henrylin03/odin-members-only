import type { Request, Response } from "express";

const allThoughtsGet = (_req: Request, res: Response) =>
	res.render("pages/allThoughts");

const newThoughtGet = (_req: Request, res: Response) => {
	res.render("pages/newThought", { title: "Add thought" });
};

const newThoughtPost = (_req: Request, res: Response) => {
	res.redirect("/thoughts");
};

export { allThoughtsGet, newThoughtGet, newThoughtPost };
