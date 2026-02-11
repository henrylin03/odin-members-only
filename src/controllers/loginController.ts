import type { Request, Response } from "express";
import passport from "@/config/passport.js";

const loginGet = async (req: Request, res: Response) => {
	console.log("req.session:", req.session);
	res.render("pages/loginForm");
};

const loginPost = passport.authenticate("local", {
	failureFlash: true,
	successRedirect: "/",
	failureRedirect: "/login",
});

export { loginPost, loginGet };
