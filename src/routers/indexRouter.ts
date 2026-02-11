import { Router } from "express";
import {
	protectedPageGet,
	showHomePageGet,
} from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", showHomePageGet);
indexRouter.get("/protected", protectedPageGet);

export default indexRouter;
