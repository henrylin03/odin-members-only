import path from "node:path";
import pgSession from "connect-pg-simple";
import express from "express";
import expressSession from "express-session";
import indexRouter from "./routers/indexRouter.js";
import loginRouter from "./routers/loginRouter.js";
import registerRouter from "./routers/registerRouter.js";

const app = express();

const currentPath = import.meta.dirname;

app.use(express.static(path.join(currentPath, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(currentPath, "views"));

/* middleware to parse data in request body */
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

const PORT = 3000;
app.listen(PORT, (err) => {
	if (err) throw Error;
	console.log(`Listening on port ${PORT}`);
});
