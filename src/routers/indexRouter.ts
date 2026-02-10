import { Router } from "express";
import { showHomePageGet } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", showHomePageGet);

export default indexRouter;
