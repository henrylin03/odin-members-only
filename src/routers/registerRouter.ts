import { Router } from "express";
import {
	registerUserGet,
	registerUserPost,
} from "@/controllers/registerController.js";

const registerRouter = Router();

registerRouter.get("/", registerUserGet);
registerRouter.post("/", ...registerUserPost);

export default registerRouter;
