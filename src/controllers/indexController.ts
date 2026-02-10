import type { Request, Response } from "express";

const showHomePageGet = async (_req: Request, res: Response) => {
	res.render("pages/index");
};

export { showHomePageGet };
