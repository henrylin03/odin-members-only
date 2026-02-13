import { Router } from "express";
import { loginGet, loginPost } from "@/controllers/auth/loginController.js";
import { logoutGet } from "@/controllers/auth/logoutController.js";
import {
	updateUserToAdminPost,
	updateUserToMemberPost,
} from "@/controllers/auth/permissionsController.js";
import {
	signupUserGet,
	signupUserPost,
} from "@/controllers/auth/signupController.js";

const authRouter = Router();

authRouter.get("/signup", signupUserGet);
authRouter.post("/signup", ...signupUserPost);

authRouter.get("/login", loginGet);
authRouter.post("/login", loginPost);
authRouter.get("/logout", logoutGet);

authRouter.post("/become-member", updateUserToMemberPost);
authRouter.post("/become-admin", updateUserToAdminPost);

export default authRouter;
