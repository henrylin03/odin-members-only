import { Router } from "express";
import {
	allThoughtsGet,
	newThoughtGet,
} from "@/controllers/thoughtsController.js";

const thoughtsRouter = Router();

thoughtsRouter.get("/", allThoughtsGet);
thoughtsRouter.get("/new", newThoughtGet);

export default thoughtsRouter;
