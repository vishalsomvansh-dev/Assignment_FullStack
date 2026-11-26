const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = ["Learn Express", "Practice JavaScript"];

// GET routes
app.get("/", (req, res) => res.render("home", { notes }));
app.get("/about", (req, res) => res.send("About page"));
app.get("/contact", (req, res) => res.send("Contact page"));
app.get("/api/notes", (req, res) => res.json(notes));

// POST route
app.post("/notes", (req, res) => {
  const note = (req.body.note || "").trim();
  if (!note) return res.status(400).send("Note is required");
  notes.push(note);
  res.redirect("/");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));