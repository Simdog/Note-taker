const fs = require("fs");
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const util = require("util");
const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);


const app = express();
const PORT = process.env.PORT || 7500;

app.use(express.urlencoded ({ extended: true }));
app.use (express.json());
app.use(express.static("public"));


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    console.log("the notes is working");
});

app.get("/api/notes", async (req, res) => {
    try {
        return res.json(JSON.parse(await readAsync(path.join(__dirname, "/db/db.json"), 'utf-8')));
    } catch (err) {
        console.log(err);
    }
});


app.post("/api/notes", async (req, res) => {
try {
    let newNote = JSON.parse(JSON.stringify(req.body));
    newNote.id = uuidv4();
    console.log(newNote);

    let newArray = JSON.parse(await readAsync(path.join(__dirname, "/db/db.json"), 'utf-8'));

    newArray.push(newNote);
    await writeAsync(path.join(__dirname, "/db/db.json"), JSON.stringify(newArray));

    return res.json(newNote);

} catch (err) {
console.log(err);
}
});
app.delete("/api/notes/:id", async (req, res) => {
    console.log("delete is working");
    try {

        let newDelete = req.params.id;

        let newArray = JSON.parse(await readAsync(path.join(__dirname, "/db/db.json"), 'utf-8'));

        for (note of newArray) {
            if (note.id == newDelete) {
                
            }
        }
    }
})

app.listen(PORT, function (){ 
    console.log("App listening to PORT:" + PORT);

});