import path from "node:path";
import genFunc from "connect-pg-simple";
import "dotenv/config";
import flash from "connect-flash";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import passport from "./config/passport.js";
import { pool } from "./db/pool.js";
import indexRouter from "./routers/indexRouter.js";
import loginRouter from "./routers/loginRouter.js";
import registerRouter from "./routers/registerRouter.js";

const app = express();

const currentPath = import.meta.dirname;
app.use(express.static(path.join(currentPath, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(currentPath, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/baseLayout");

/* middleware */
const cookieSecret = process.env.COOKIE_SECRET;
if (!cookieSecret) throw new Error("COOKIE_SECRET env variable is required.");

const PostgresStore = genFunc(session);
const sessionStore = new PostgresStore({
	pool,
	tableName: "user_session",
	createTableIfMissing: true,
});

app.use(
	session({
		store: sessionStore,
		secret: cookieSecret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000,
		}, // 30 days
	}),
);
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

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
