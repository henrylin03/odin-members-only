import bcrypt from "bcryptjs";
import passport from "passport";
import LocalStrategy from "passport-local";
import { getUserById, getUserByUsername } from "@/db/queries.js";

passport.use(
	new LocalStrategy.Strategy(async (username, password, done) => {
		try {
			const user = await getUserByUsername(username);
			if (user === null) return done(null, false, { message: "username" });

			const isPasswordMatched = await bcrypt.compare(password, user.password);
			if (!isPasswordMatched) return done(null, false, { message: "password" });

			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await getUserById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

export default passport;
