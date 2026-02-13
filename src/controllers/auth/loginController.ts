import type { Request, Response } from "express";
import passport from "@/config/passport.js";
import type { LoginError, LoginField } from "@/models/fields.js";

const LOGIN_ERROR_MESSAGES = {
	username: "Sorry, we couldn't find an account with that username.",
	password: "Sorry, that password isn't right. Please try again.",
};

const loginGet = async (req: Request, res: Response) => {
	const { session } = req;

	if (!session.flash || !session.flash.error || !session.flash.error.length)
		return res.render("pages/loginForm");

	const fieldWithError: LoginField | null = session.flash.error.pop() || null;

	if (!fieldWithError) return res.render("pages/loginForm");

	const loginError: LoginError = {
		field: fieldWithError,
		message: LOGIN_ERROR_MESSAGES[fieldWithError] || "",
	};

	res.render("pages/loginForm", { error: loginError });
};

const loginPost = passport.authenticate("local", {
	failureFlash: true,
	successRedirect: "/",
	failureRedirect: "/login",
});

export { loginGet, loginPost };
