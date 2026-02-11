import type { Request, Response } from "express";
import passport from "@/config/passport.js";

type LoginField = "username" | "password";

const loginGet = async (req: Request, res: Response) => {
	console.log("req.session:", req.session);

	const { session } = req;
	if (!("flash" in session) || session.flash.error.length === 0)
		return res.render("pages/loginForm");

	const fieldWithError: LoginField = session.flash.error.pop();
	console.log(fieldWithError);

	req.session.flash.error = [];

	res.render("pages/loginForm");
};

const loginPost = passport.authenticate("local", {
	failureFlash: true,
	successRedirect: "/",
	failureRedirect: "/login",
});

export { loginPost, loginGet };
