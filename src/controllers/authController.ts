import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import passport from "@/config/passport.js";
import {
	addUser,
	elevateUserToAdmin,
	elevateUserToMember,
	getPermissionElevationPasskey,
} from "@/db/queries.js";
import { validateRegistrationForm } from "@/helpers/validation.js";
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

const logoutGet = (req: Request, res: Response, next: NextFunction) =>
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/");
	});

const signupUserGet = async (_req: Request, res: Response) => {
	res.render("pages/signupForm");
};

const signupUserPost = [
	validateRegistrationForm,
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res
				.status(400)
				.render("pages/signupForm", { errors: errors.array() });

		const { firstName, lastName, username, password } = matchedData(req);
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const formData = {
			firstName,
			lastName,
			username,
			password: hashedPassword,
		};

		await addUser(formData);

		res.redirect("/");
	},
];

const updateUserToMemberPost = async (req: Request, res: Response) => {
	const userEnteredPasskey = req.body.passkey;
	const user = req.user;
	if (!user) return res.redirect("/login");

	const { id: userId, is_member: isMember } = user;
	if (isMember) return res.redirect("/");

	const passkeyToBecomeMember = await getPermissionElevationPasskey("member");
	if (!passkeyToBecomeMember) {
		console.error(
			"Passkey to become member has not been defined in the database yet. Please seed database again.",
		);
		return res.redirect("/");
	}

	const isCorrectPassword = await bcrypt.compare(
		userEnteredPasskey,
		passkeyToBecomeMember,
	);
	if (isCorrectPassword) await elevateUserToMember(userId);

	res.redirect("/");
};

const updateUserToAdminPost = async (req: Request, res: Response) => {
	const userEnteredPasskey = req.body.passkey;
	const user = req.user;
	if (!user) return res.redirect("/login");

	const { id: userId, is_admin: isAdmin } = user;
	if (isAdmin) return res.redirect("/");

	const passKeyToBecomeAdmin = await getPermissionElevationPasskey("admin");
	if (!passKeyToBecomeAdmin) {
		console.error(
			"Passkey to become admin has not been defined in the database yet. Please seed database again.",
		);
		return res.redirect("/");
	}

	const isCorrectPassword = await bcrypt.compare(
		userEnteredPasskey,
		passKeyToBecomeAdmin,
	);
	if (isCorrectPassword) await elevateUserToAdmin(userId);

	res.redirect("/");
};

export {
	loginGet,
	loginPost,
	logoutGet,
	signupUserGet,
	signupUserPost,
	updateUserToMemberPost,
	updateUserToAdminPost,
};
