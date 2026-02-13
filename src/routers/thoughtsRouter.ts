import { Router } from "express";
import { allThoughtsGet } from "@/controllers/thoughtsController.js";

const thoughtsRouter = Router();

thoughtsRouter.get("/", allThoughtsGet);

export default thoughtsRouter;
