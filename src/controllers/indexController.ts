import type { Request, Response } from "express";

const showHomePageGet = async (_req: Request, res: Response) => {
	res.render("index");
};

const registerUserGet = async (_req: Request, res: Response) => {
	res.render("signupForm");
};

const registerUserPost = async (_req: Request, res: Response) => {
	res.redirect("/");
};

export { showHomePageGet, registerUserGet, registerUserPost };
