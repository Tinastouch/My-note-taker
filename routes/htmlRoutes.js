const path = require('path');
const router = require('express').Router();


// HTML requests

// Requests home
router.get("*", function (req,res) {
    res.sendFile(path.join(_dirname, "../public/index.html"));
});

// Requests notes 
app.get("/notes", function (req,res) {
    res.sendFile(path.join(_dirname, "./Develop/public/notes.html"));
});

module.exports = router;
