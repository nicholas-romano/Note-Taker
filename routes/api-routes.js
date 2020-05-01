let notes = require('../db/db.json');
var fs = require("fs");

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    const note = req.body;

    //find the highest id number:
    let highest = 0;
    for (let key in notes) {
      let id = notes[key].id;
      if (id > highest) {
        highest = id;
      }
    }

    //add one to the highest number and set it to the new note:
    note.id = highest + 1;
    notes.push(note);

    //write new json element to db.json file:
    fs.writeFile("db/db.json", JSON.stringify(notes), function(err) {

      if (err) {
        return console.log(err);
      }
    
      console.log("Successfully added JSON element to the db.json file.");
      res.json(note);
    
    });

  });

  app.get("/api/notes/:id", (req, res) => {
    //get id selected:
    var chosen_note_id = parseInt(req.params.id);

    for (let key in notes) {

      let {id, title, text} = notes[key];

      //find matching id in json and return object:
      if (id === chosen_note_id) {
        res.json({"id": id, "title": title, "text": text});
      }

    }

  });

  app.delete("/api/notes/:id", (req, res) => {
    //get id selected:
    var chosen_note_id = parseInt(req.params.id);

    //Filter out the json element that matches the selected id:
    let result = notes.filter(({id}) => id !== chosen_note_id);
    notes = result;

    //write new json array to db.json file:
    fs.writeFile("db/db.json", JSON.stringify(notes), function(err) {

      if (err) {
        return console.log(err);
      }
    
      console.log("Successfully removed JSON element from the db.json file.");
      res.json(notes);
    
    });
    

  });

  
};