const express = require("express");
const fs = require ("fs");
const path = require("path");
const notes = require ("./db/db.json");;
const uuid = require("uuid")

// Asynchronous Processes
// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 8009;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes for APIs

// This route gets notes and saves it in db.json
app.get("/api/notes", (req,res) => {
    const data = JSON.parse(fs.readFileSync('./db/db.json'));
    console.log(data);
    res.json(data);
});

// This route adds new notes to db.json
app.post("/api/notes", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
})

// This route used for deleting notes
app.delete("/api/notes/:id", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})

// HTML requests

// Requests home 
app.get("/", function (req,res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Requests notes 
app.get("/notes", function (req,res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Start to Listen
// app.listen(PORT, function () {
//     console.lod("App listening on Port: " + PORT)
// });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

