import path from "node:path";
import express from "express";

const app = express();

const currentPath = import.meta.dirname;

app.use(express.static(path.join(currentPath, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(currentPath, "views"));

/* middleware to parse data in request body */
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => res.render("index"));

const PORT = 3000;
app.listen(PORT, (err) => {
	if (err) throw Error;
	console.log(`Listening on port ${PORT}`);
});
