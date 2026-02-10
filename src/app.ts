import path from "node:path";
import connectPgSimple from "connect-pg-simple";
import "dotenv/config";
import express from "express";
import session from "express-session";
import { pool as pgPool } from "./db/pool.js";
import indexRouter from "./routers/indexRouter.js";
import loginRouter from "./routers/loginRouter.js";
import registerRouter from "./routers/registerRouter.js";

const app = express();

const currentPath = import.meta.dirname;

app.use(express.static(path.join(currentPath, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(currentPath, "views"));

/* middleware */
const cookieSecret = process.env.COOKIE_SECRET;
if (!cookieSecret) throw new Error("COOKIE_SECRET env variable is required.");

const pgSession = connectPgSimple(session);

app.use(
	session({
		store: new pgSession({
			pool: pgPool,
			tableName: "user_session",
			createTableIfMissing: true,
		}),
		secret: cookieSecret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000,
		}, // 30 days
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
