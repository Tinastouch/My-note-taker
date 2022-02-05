const fs = require ("fs");
const { stripVTControlCharacters } = require("util");
const uuid = require("uuid");
const router = require("express").Router();
const store = require('../db/store');

// Routes for APIs


// This route gets notes and saves it in db.json
router.get("/notes", (req,res) => {
    store
        .getNotes()
        .then(notes => {
            return res.json(notes)
        })
        .catch(err => res.status(500).json(err));
})

// This route adds new notes to db.json
router.post("/notes", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const addNotes = req.body;
    addNotes.id = uuid.v4();
    notes.push(addNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
})

// This route used for deleting notes
router.delete("/notes/:id", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNotes = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})

module.exports = router;
