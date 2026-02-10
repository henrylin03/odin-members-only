import path from "node:path";
import pgSession from "connect-pg-simple";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import indexRouter from "./routers/indexRouter.js";
import loginRouter from "./routers/loginRouter.js";
import registerRouter from "./routers/registerRouter.js";

dotenv.config();
const app = express();

const currentPath = import.meta.dirname;

app.use(express.static(path.join(currentPath, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(currentPath, "views"));

/* middleware */
app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(express.urlencoded({ extended: true }));

/* routes */
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

const PORT = 3000;
app.listen(PORT, (err) => {
	if (err) throw Error;
	console.log(`Listening on port ${PORT}`);
});
