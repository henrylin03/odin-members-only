import { Router } from "express";
import {
	allThoughtsGet,
	newThoughtGet,
	newThoughtPost,
} from "@/controllers/thoughtsController.js";

const thoughtsRouter = Router();

thoughtsRouter.get("/", allThoughtsGet);
thoughtsRouter.get("/new", newThoughtGet);
thoughtsRouter.post("/new", newThoughtPost);

export default thoughtsRouter;
