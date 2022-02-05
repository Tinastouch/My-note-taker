const express = require("express");
const fs = require ("fs");
const path = require("path");
const notes = require ("./Develop/db/db.json");;
const uuid = require("uuid")
// const {DH_CHECK_P_NOT_SAFE_PRIME} = require ("constants");

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
app.get("./api/notes", (req,res) => {
    res.sendFile(path.join(_dirname, "./Develop/db/db.json"))
});

// This route adds new notes to db.json
app.post("/api/notes", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
    const newNotes = req.body;
    notes.push(newNotes);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
    res.json(notes);
})

// This route used for deleting notes
app.delete("/api/notes", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    notes.push(newNotes);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})

// HTML requests

// Requests home 
app.get("/", function (req,res) {
    res.sendFile(path.join(_dirname, "./Develop/public/index.html"));
});

// Requests notes 
app.get("/notes", function (req,res) {
    res.sendFile(path.join(_dirname, "./Develop/public/notes.html"));
});

// Start to Listen
// app.listen(PORT, function () {
//     console.lod("App listening on Port: " + PORT)
// });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });