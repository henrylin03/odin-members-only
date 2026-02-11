import { Router } from "express";
import { logout, showHomePageGet } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", showHomePageGet);
indexRouter.get("/log-out", logout);

export default indexRouter;
