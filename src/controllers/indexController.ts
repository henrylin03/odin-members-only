import type { NextFunction, Request, Response } from "express";

const showHomePageGet = async (_req: Request, res: Response) => {
	res.render("pages/index");
};

const logout = (req: Request, res: Response, next: NextFunction) =>
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/");
	});

export { showHomePageGet, logout };
