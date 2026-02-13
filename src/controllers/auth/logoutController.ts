import type { NextFunction, Request, Response } from "express";

const logoutGet = (req: Request, res: Response, next: NextFunction) =>
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/");
	});

export { logoutGet };
