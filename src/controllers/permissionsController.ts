import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import {
	elevateUserToAdmin,
	elevateUserToMember,
	getPermissionElevationPasskey,
} from "@/db/queries.js";

export const updateUserToMemberPost = async (req: Request, res: Response) => {
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

export const updateUserToAdminPost = async (req: Request, res: Response) => {
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
