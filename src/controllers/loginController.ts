import type { Request, Response } from "express";
import passport from "@/config/passport.js";

type LoginField = "username" | "password";
type LoginError = {
	field: LoginField;
	message: string;
};

const getLoginErrorMessage = (fieldWithError: LoginField): string => {
	if (fieldWithError === "username")
		return "Sorry, we couldn't find an account with that username.";
	if (fieldWithError === "password")
		return "Sorry, that password isn't right. Please try again.";
	else return "";
};

const loginGet = async (req: Request, res: Response) => {
	const { session } = req;
	if (!("flash" in session) || session.flash.error.length === 0)
		return res.render("pages/loginForm");

	const fieldWithError: LoginField = session.flash.error.pop();
	const loginError: LoginError = {
		field: fieldWithError,
		message: getLoginErrorMessage(fieldWithError),
	};

	req.session.flash.error = [];
	res.render("pages/loginForm", { error: loginError });
};

const loginPost = passport.authenticate("local", {
	failureFlash: true,
	successRedirect: "/",
	failureRedirect: "/login",
});

export { loginPost, loginGet };
