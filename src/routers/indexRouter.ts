import { Router } from "express";
import {
	registerUserGet,
	registerUserPost,
	showHomePageGet,
} from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", showHomePageGet);
indexRouter.get("/register", registerUserGet);
indexRouter.post("/register", ...registerUserPost);

export default indexRouter;
