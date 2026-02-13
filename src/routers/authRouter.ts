import { Router } from "express";
import {
	loginGet,
	loginPost,
	logoutGet,
	signupUserGet,
	signupUserPost,
	updateUserToAdminPost,
	updateUserToMemberPost,
} from "@/controllers/authController.js";

const authRouter = Router();

authRouter.get("/signup", signupUserGet);
authRouter.post("/signup", ...signupUserPost);

authRouter.get("/login", loginGet);
authRouter.post("/login", loginPost);
authRouter.get("/logout", logoutGet);

authRouter.post("/become-member", updateUserToMemberPost);
authRouter.post("/become-admin", updateUserToAdminPost);

export default authRouter;
