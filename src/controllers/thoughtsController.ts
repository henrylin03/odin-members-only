import type { Request, Response } from "express";

export const allThoughtsGet = (_req: Request, res: Response) =>
	res.render("pages/allThoughts");
